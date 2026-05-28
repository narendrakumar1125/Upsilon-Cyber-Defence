const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const crypto = require('crypto');

// Initialize Firebase Admin SDK
admin.initializeApp();

// PhonePe Configuration
// IMPORTANT: Update these with your valid PhonePe merchant credentials
// For testing, you can use PhonePe sandbox credentials
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'M22VATU0PUEQE';
const SALT_KEY = process.env.PHONEPE_SALT_KEY || '2fb67662-2872-433a-9285-4ff793f357f5';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
// Use sandbox for testing: 'https://api-preprod.phonepe.com/apis/pg-sandbox'
// Use production: 'https://api.phonepe.com/apis/hermes'
const PHONEPE_API_BASE = process.env.PHONEPE_API_URL || 'https://api.phonepe.com/apis/hermes';
const BASE_URL = process.env.BASE_URL || 'https://cybernexgen.com';
const IS_TEST_MODE = process.env.PHONEPE_TEST_MODE === 'true' || false;

// Simple API function for payment endpoints
exports.nextjsApi = functions.https.onRequest((req, res) => {
  // CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  
  // Extract the path from the request URL
  const path = req.path;
  console.log('Request path:', path);
  
  // Handle PhonePe callback
  if (path.startsWith('/payment/callback') || path.startsWith('/api/payment/callback')) {
    // Get the response payload
    const responseData = req.body;
    
    // Verify the response checksum
    const bodyText = JSON.stringify(responseData);
    const string = bodyText + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + SALT_INDEX;
    
    if (req.headers['x-verify'] === checksum) {
      if (responseData.code === 'PAYMENT_SUCCESS') {
        // In a production implementation, store the payment details in Firestore
        console.log('Payment successful:', responseData);
      }
    }
    
    // Return response to PhonePe
    res.status(200).json({ status: 'SUCCESS' });
  } 
  // Handle payment initiation
  else if (path.startsWith('/payment/initiate') || path.startsWith('/api/payment/initiate')) {
    // Log the payment request for debugging
    console.log("Payment initiation request received:", req.body);
    console.log("PhonePe Configuration:", {
      merchantId: MERCHANT_ID,
      apiBase: PHONEPE_API_BASE,
      testMode: IS_TEST_MODE,
      baseUrl: BASE_URL
    });
    
    // Get payment details from request
    const paymentDetails = req.body;
    
    // Generate unique transaction IDs
    const merchantTransactionId = 'MT' + Date.now() + Math.floor(Math.random() * 10000);
    const merchantUserId = 'MUID' + Date.now() + Math.floor(Math.random() * 10000);
    
    // Extract course ID from payment details
    const courseId = paymentDetails.course_id || 'unknown';
    
    // Create PhonePe payment payload
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: merchantUserId,
      amount: parseInt(paymentDetails.amount) * 100, // Convert to paise
      redirectUrl: `${BASE_URL}/courses/${courseId}/payment-success`,
      redirectMode: "REDIRECT",
      callbackUrl: `https://us-central1-cybernexgen-766e5.cloudfunctions.net/nextjsApi/payment/callback`,
      merchantOrderId: merchantTransactionId,
      mobileNumber: paymentDetails.number || "",
      message: "Payment for " + paymentDetails.course_name,
      email: paymentDetails.email,
      shortName: "CyberNexGen",
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };
    
    // Encode payload to base64
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    
    // Calculate checksum
    const string = base64Payload + "/pg/v1/pay" + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + SALT_INDEX;
    
    // Store transaction details in Firestore
    admin.firestore().collection('payments').add({
      ...paymentDetails,
      merchant_transaction_id: merchantTransactionId,
      merchant_user_id: merchantUserId,
      status: 'PENDING',
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(async () => {
      try {
        // Make request to PhonePe API
        const response = await axios.post(
          PHONEPE_API_BASE + '/pg/v1/pay',
          {
            request: base64Payload
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-VERIFY': checksum,
              'Accept': 'application/json',
              'X-MERCHANT-ID': MERCHANT_ID
            }
          }
        );
        
        console.log('PhonePe API Response:', response.data);
        
        if (response.data.success === true && response.data.data.instrumentResponse) {
          const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
          
          res.status(200).json({
            success: true,
            redirectUrl: redirectUrl,
            transactionId: merchantTransactionId
          });
        } else {
          throw new Error('Payment initialization failed: ' + (response.data.message || 'Unknown error'));
        }
      } catch (apiError) {
        console.error('PhonePe API Error:', apiError.response?.data || apiError.message);
        console.error('Full error details:', {
          status: apiError.response?.status,
          statusText: apiError.response?.statusText,
          data: apiError.response?.data,
          message: apiError.message
        });
        
        // Extract detailed error message from PhonePe response
        let errorMessage = 'Payment gateway error';
        if (apiError.response?.data) {
          if (apiError.response.data.message) {
            errorMessage = apiError.response.data.message;
          } else if (apiError.response.data.error) {
            errorMessage = apiError.response.data.error;
          } else if (typeof apiError.response.data === 'string') {
            errorMessage = apiError.response.data;
          }
        }
        
        // Provide helpful error message for common issues
        if (errorMessage.includes('Invalid Merchant') || errorMessage.includes('blacklisted') || errorMessage.includes('disabled')) {
          errorMessage = 'Invalid Merchant: The PhonePe merchant account is either invalid, disabled, or blacklisted. Please contact support or update your merchant credentials in Firebase Functions environment variables.';
        }
        
        res.status(500).json({
          success: false,
          error: errorMessage,
          details: IS_TEST_MODE ? {
            merchantId: MERCHANT_ID,
            apiBase: PHONEPE_API_BASE,
            testMode: true
          } : undefined
        });
      }
    })
    .catch(error => {
      console.error('Error storing payment details:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    });
  } else {
    res.status(404).json({ error: 'API route not found' });
  }
});

// Cloud Function to set admin role for a user
// Usage: POST /setAdminRole
// Body: { email: "user@example.com", adminSecret: "CyberNexGen2024AdminSecret!@#" }
// Note: Default secret is set below. For production, use environment variables.
exports.setAdminRole = functions.https.onRequest(async (req, res) => {
  // CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  try {
    const { email, adminSecret } = req.body;
    // Default admin secret - change this for production
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'CyberNexGen2024AdminSecret!@#';
    
    // Verify admin secret
    if (!adminSecret || adminSecret !== ADMIN_SECRET) {
      res.status(401).json({ error: 'Unauthorized: Invalid admin secret' });
      return;
    }
    
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }
    
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Set custom claim for admin role
    await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
    
    res.status(200).json({
      success: true,
      message: `Admin role set successfully for ${email}`,
      uid: user.uid
    });
  } catch (error) {
    console.error('Error setting admin role:', error);
    
    if (error.code === 'auth/user-not-found') {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
});

// Cloud Function to remove admin role from a user
// Usage: POST /removeAdminRole
// Body: { email: "user@example.com", adminSecret: "your-secret-key" }
exports.removeAdminRole = functions.https.onRequest(async (req, res) => {
  // CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  try {
    const { email, adminSecret } = req.body;
    // Default admin secret - change this for production
    const ADMIN_SECRET = process.env.ADMIN_SECRET || 'CyberNexGen2024AdminSecret!@#';
    
    // Verify admin secret
    if (!adminSecret || adminSecret !== ADMIN_SECRET) {
      res.status(401).json({ error: 'Unauthorized: Invalid admin secret' });
      return;
    }
    
    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }
    
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Remove admin role by setting role to 'user'
    await admin.auth().setCustomUserClaims(user.uid, { role: 'user' });
    
    res.status(200).json({
      success: true,
      message: `Admin role removed successfully for ${email}`,
      uid: user.uid
    });
  } catch (error) {
    console.error('Error removing admin role:', error);
    
    if (error.code === 'auth/user-not-found') {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
});