# PhonePe Payment Gateway Setup Guide

## Issue: "Invalid Merchant: Either not present or blacklisted or disabled"

This error occurs when the PhonePe merchant credentials are invalid, expired, disabled, or blacklisted.

## Solutions

### Option 1: Update Merchant Credentials (Recommended)

1. **Get Valid PhonePe Merchant Credentials**
   - Log in to your PhonePe Merchant Dashboard
   - Navigate to Settings > API Credentials
   - Copy your Merchant ID, Salt Key, and Salt Index

2. **Update Firebase Functions Environment Variables**
   
   ```bash
   # Navigate to functions directory
   cd functions
   
   # Set environment variables in Firebase
   firebase functions:config:set \
     phonepem.merchant_id="YOUR_MERCHANT_ID" \
     phonepem.salt_key="YOUR_SALT_KEY" \
     phonepem.salt_index="YOUR_SALT_INDEX" \
     phonepem.api_url="https://api.phonepe.com/apis/hermes" \
     phonepem.base_url="https://cybernexgen.com"
   
   # Or use the new method (Firebase Functions v2)
   firebase functions:secrets:set PHONEPE_MERCHANT_ID
   firebase functions:secrets:set PHONEPE_SALT_KEY
   firebase functions:secrets:set PHONEPE_SALT_INDEX
   ```

3. **Update the functions/index.js file** to use environment variables:
   ```javascript
   const MERCHANT_ID = functions.config().phonepem?.merchant_id || process.env.PHONEPE_MERCHANT_ID || 'YOUR_MERCHANT_ID';
   const SALT_KEY = functions.config().phonepem?.salt_key || process.env.PHONEPE_SALT_KEY || 'YOUR_SALT_KEY';
   ```

4. **Redeploy Firebase Functions**
   ```bash
   firebase deploy --only functions
   ```

### Option 2: Use PhonePe Sandbox for Testing

If you want to test without production credentials:

1. **Get Sandbox Credentials**
   - Contact PhonePe support for sandbox/test credentials
   - Or use PhonePe's test merchant credentials (if available)

2. **Update Environment Variables**
   ```bash
   firebase functions:config:set \
     phonepem.api_url="https://api-preprod.phonepe.com/apis/pg-sandbox" \
     phonepem.test_mode="true"
   ```

3. **Update BASE_URL for local testing**
   ```bash
   firebase functions:config:set \
     phonepem.base_url="http://localhost:3000"
   ```

### Option 3: Contact PhonePe Support

If your merchant account is disabled or blacklisted:

1. Contact PhonePe Merchant Support
2. Verify your account status
3. Request reactivation if needed
4. Get new credentials if required

## Current Configuration

The current hardcoded credentials in `functions/index.js`:
- **Merchant ID**: `M22VATU0PUEQE`
- **API URL**: `https://api.phonepe.com/apis/hermes` (Production)
- **Base URL**: `https://cybernexgen.com`

## Testing Locally

For local development, you can:

1. **Use environment variables in `.env.local`** (for Next.js frontend)
2. **Use Firebase Functions emulator** with local config:
   ```bash
   firebase emulators:start --only functions
   ```

## Verification Steps

After updating credentials:

1. Check Firebase Functions logs:
   ```bash
   firebase functions:log
   ```

2. Test payment initiation:
   - Try enrolling in a course
   - Check browser console for errors
   - Check Firebase Functions logs for detailed error messages

3. Verify PhonePe dashboard:
   - Check if transactions appear in PhonePe merchant dashboard
   - Verify callback URLs are configured correctly

## Common Issues

1. **"Invalid Merchant"**: Credentials are wrong or account is disabled
2. **"Checksum Mismatch"**: Salt key or index is incorrect
3. **"Callback URL not accessible"**: Ensure callback URL is publicly accessible
4. **"Redirect URL mismatch"**: Ensure redirect URL matches PhonePe dashboard settings

## Support

For issues:
- Email: support@cybernexgen.com
- Check PhonePe Merchant Dashboard
- Review Firebase Functions logs

