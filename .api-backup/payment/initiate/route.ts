import { NextRequest, NextResponse } from 'next/server';
import { initiatePayment } from '@/services/phonePeService';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const paymentDetails = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'number', 'course_name', 'amount'];
    for (const field of requiredFields) {
      if (!paymentDetails[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Initiate payment with PhonePe
    const result = await initiatePayment(paymentDetails);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        redirectUrl: result.redirectUrl,
        transactionId: result.transactionId
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error in payment initiation API:', error);
    return NextResponse.json(
      { success: false, error: 'Payment initiation failed' },
      { status: 500 }
    );
  }
}