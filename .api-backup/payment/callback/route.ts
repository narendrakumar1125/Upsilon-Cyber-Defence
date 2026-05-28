import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/utils/firebase';
import { collection, query, where, getDocs, updateDoc, addDoc } from 'firebase/firestore';
import { verifyPaymentStatus, sendEnrollmentEmail } from '@/services/phonePeService';

export const dynamic = 'force-dynamic';

// Constants from the old PHP implementation
const SALT_KEY = process.env.PHONEPE_SALT_KEY || '2fb67662-2872-433a-9285-4ff793f357f5';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';

export async function POST(request: NextRequest) {
  try {
    // Get the request body as text for checksum verification
    const bodyText = await request.text();
    const responseData = JSON.parse(bodyText);
    
    // Verify checksum from X-VERIFY header
    const calculatedChecksum = calculateChecksum(bodyText);
    const providedChecksum = request.headers.get('X-VERIFY');
    
    if (providedChecksum !== calculatedChecksum) {
      console.error('Checksum verification failed');
      return NextResponse.json(
        { status: 'FAILED', error: 'Invalid request signature' },
        { status: 400 }
      );
    }
    
    // Extract transaction ID
    const merchantTransactionId = responseData.data?.merchantTransactionId;
    if (!merchantTransactionId) {
      return NextResponse.json(
        { status: 'FAILED', error: 'Missing transaction ID' },
        { status: 400 }
      );
    }
    
    // Get payment details from Firestore
    const paymentsRef = collection(db, 'payments');
    const q = query(paymentsRef, where('transaction_id', '==', merchantTransactionId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.error('Transaction not found:', merchantTransactionId);
      return NextResponse.json(
        { status: 'FAILED', error: 'Transaction not found' },
        { status: 404 }
      );
    }
    
    const paymentDoc = querySnapshot.docs[0];
    const paymentDetails = paymentDoc.data();
    
    // Process payment status
    if (responseData.code === 'PAYMENT_SUCCESS') {
      // Update payment status in Firestore
      await updateDoc(paymentDoc.ref, {
        status: 'SUCCESS',
        phonepe_callback_response: responseData
      });

      // Send email notification
      await sendEnrollmentEmail({
        name: paymentDetails.name || '',
        email: paymentDetails.email || '',
        number: paymentDetails.number || '',
        course_name: paymentDetails.course_name || '',
        amount: paymentDetails.amount || '',
        transaction_id: paymentDetails.transaction_id,
        status: 'SUCCESS'
      });
      
      // Create enrollment record in Firestore
      await addDoc(collection(db, 'enrollments'), {
        user_name: paymentDetails.name,
        user_email: paymentDetails.email,
        user_phone: paymentDetails.number,
        course_name: paymentDetails.course_name,
        amount_paid: paymentDetails.amount,
        transaction_id: merchantTransactionId,
        enrolled_at: new Date().toISOString()
      });
      
      return NextResponse.json({ status: 'SUCCESS' });
    } else {
      // Update with failure status
      await updateDoc(paymentDoc.ref, {
        status: 'FAILED',
        phonepe_callback_response: responseData
      });
      
      return NextResponse.json({ status: 'SUCCESS' }); // Still return success to PhonePe
    }
  } catch (error) {
    console.error('Error in payment callback:', error);
    return NextResponse.json(
      { status: 'ERROR', error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// For handling redirect from PhonePe to success page
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const transactionId = searchParams.get('transactionId');
    
    if (!transactionId) {
      return NextResponse.redirect(new URL('/courses', request.url));
    }
    
    // Verify payment status with PhonePe
    const result = await verifyPaymentStatus(transactionId);
    
    // Get course ID from Firestore
    const paymentsRef = collection(db, 'payments');
    const q = query(paymentsRef, where('transaction_id', '==', transactionId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return NextResponse.redirect(new URL('/courses', request.url));
    }
    
    const paymentDetails = querySnapshot.docs[0].data();
    // Extract course ID from course name to construct redirect URL
    // This assumes course_name follows a pattern we can extract ID from
    // Alternatively, you could store course_id in the payment record
    const courseId = getCourseIdFromName(paymentDetails.course_name);
    
    if (result.success) {
      // Redirect to success page
      return NextResponse.redirect(
        new URL(`/courses/${courseId}/payment-success.tsx?transactionId=${transactionId}`, request.url)
      );
    } else {
      // Redirect to failure page
      return NextResponse.redirect(
        new URL(`/courses/${courseId}?payment=failed`, request.url)
      );
    }
  } catch (error) {
    console.error('Error processing redirect:', error);
    return NextResponse.redirect(new URL('/courses', request.url));
  }
}

// Helper function to calculate checksum for verification
function calculateChecksum(payload: string): string {
  const string = payload + SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  return sha256 + "###" + SALT_INDEX;
}

// Helper function to extract course ID from name
// This is a simple implementation - adjust based on your actual naming convention
function getCourseIdFromName(courseName: string): string {
  // Example mapping - in a real app, you'd have a more robust solution
  const nameToIdMap: Record<string, string> = {
    'Cloud Security': 'cloud-security',
    'Network Security': 'network-security',
    // Add more mappings as needed
  };
  
  return nameToIdMap[courseName] || 'unknown-course';
}