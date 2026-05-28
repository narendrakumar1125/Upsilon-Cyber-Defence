/**
 * Script to set admin role for a user
 * 
 * Usage:
 *   node scripts/set-admin-role.js <email> [adminSecret]
 * 
 * Example:
 *   node scripts/set-admin-role.js admin@cybernexgen.com your-secret-key
 * 
 * Note: This script uses the Cloud Function endpoint.
 * Make sure the Cloud Function is deployed first.
 */

const axios = require('axios');

// Get command line arguments
const email = process.argv[2];
const adminSecret = process.argv[3] || 'change-this-secret-key';

if (!email) {
  console.error('Error: Email is required');
  console.log('\nUsage: node scripts/set-admin-role.js <email> [adminSecret]');
  console.log('Example: node scripts/set-admin-role.js admin@cybernexgen.com your-secret-key');
  process.exit(1);
}

// Cloud Function URL (update this with your actual function URL)
const FUNCTION_URL = 'https://us-central1-cybernexgen-766e5.cloudfunctions.net/setAdminRole';

console.log(`Setting admin role for: ${email}`);
console.log('Calling Cloud Function...\n');

axios.post(FUNCTION_URL, {
  email: email,
  adminSecret: adminSecret
})
.then(response => {
  console.log('✅ Success!');
  console.log(response.data);
  console.log('\n⚠️  Important: The user needs to sign out and sign in again for the role change to take effect.');
})
.catch(error => {
  console.error('❌ Error:', error.response?.data?.error || error.message);
  if (error.response?.status === 401) {
    console.error('\n💡 Tip: Make sure you have set the ADMIN_SECRET environment variable in Firebase Functions.');
    console.error('   Set it using: firebase functions:config:set admin.secret="your-secret-key"');
  }
  process.exit(1);
});

