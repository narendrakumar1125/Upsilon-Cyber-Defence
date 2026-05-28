const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

// API function
exports.nextjsApi = functions.https.onRequest((req, res) => {
  // Simple CORS configuration
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.status(204).send('');
    return;
  }
  
  // Extract the API path from the request URL
  const path = req.path;
  
  if (path.startsWith('/payment/callback')) {
    // Handle PhonePe callback
    if (req.method === 'POST') {
      // Get request body
      const requestBody = req.body;
      const merchantTransactionId = requestBody.data?.merchantTransactionId;
      
      if (merchantTransactionId) {
        // Process the payment in Firestore
        const db = admin.firestore();
        
        // Example: Update payment status in Firestore
        db.collection('payments')
          .where('transaction_id', '==', merchantTransactionId)
          .get()
          .then(snapshot => {
            if (!snapshot.empty) {
              const doc = snapshot.docs[0];
              return doc.ref.update({
                status: 'SUCCESS',
                phonepe_callback_response: requestBody
              });
            }
            return null;
          })
          .then(() => {
            res.status(200).json({ status: 'SUCCESS' });
          })
          .catch(error => {
            console.error('Error updating payment:', error);
            res.status(500).json({ status: 'ERROR', error: 'Internal server error' });
          });
      } else {
        res.status(400).json({ status: 'FAILED', error: 'Missing transaction ID' });
      }
    } else if (req.method === 'GET') {
      // Redirect to success page
      const transactionId = req.query.transactionId;
      if (transactionId) {
        res.redirect(303, `/courses/cloud-security/payment-success?transactionId=${transactionId}`);
      } else {
        res.redirect(303, '/courses');
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } else if (path.startsWith('/payment/initiate')) {
    // Handle payment initiation
    if (req.method === 'POST') {
      // Get payment details from request body
      const paymentDetails = req.body;
      
      // Simple validation
      const requiredFields = ['name', 'email', 'number', 'course_name', 'amount'];
      for (const field of requiredFields) {
        if (!paymentDetails[field]) {
          res.status(400).json({ 
            success: false, 
            error: `Missing required field: ${field}` 
          });
          return;
        }
      }
      
      // Generate a unique transaction ID
      const transactionId = 'CNGACAD' + Date.now().toString();
      
      // Save payment details to Firestore
      const db = admin.firestore();
      const paymentData = {
        ...paymentDetails,
        transaction_id: transactionId,
        status: 'PENDING',
        created_at: new Date().toISOString(),
      };
      
      db.collection('payments').add(paymentData)
        .then(() => {
          // For demo purposes, just return success with a mock redirect URL
          // In a real implementation, you would call the PhonePe API here
          res.status(200).json({
            success: true,
            redirectUrl: `https://cybernexgen.com/courses/cloud-security/payment-success?transactionId=${transactionId}`,
            transactionId
          });
        })
        .catch(error => {
          console.error('Error saving payment details:', error);
          res.status(500).json({ 
            success: false, 
            error: 'Failed to initiate payment' 
          });
        });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } else {
    // Handle other API routes
    res.status(404).json({ error: 'API route not found' });
  }
});