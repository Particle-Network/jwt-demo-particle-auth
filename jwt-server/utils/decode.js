const { jwtVerify, importSPKI } = require('jose');
const fs = require('fs').promises;

const PUBLIC_KEY_PATH = './public_key.pem';

async function decodeJWT(token) {
  try {
    // Read the public key from file
    const publicKeyPem = await fs.readFile(PUBLIC_KEY_PATH, 'utf8');
    const publicKey = await importSPKI(publicKeyPem, 'RS256');

    // Verify the JWT
    const { payload, protectedHeader } = await jwtVerify(token, publicKey);

    console.log('JWT verified successfully');
    console.log('Payload:', payload);
    console.log('Protected Header:', protectedHeader);
  } catch (error) {
    console.error('Failed to verify JWT:', error);
  }
}

// Example JWT to decode
const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IldlYjMgVXNlciIsImlzcyI6InBhcnRpY2xlLW5ldHdvcmsiLCJhdWQiOiJ5b3VyLWRhcHAuaW8iLCJpYXQiOjE3MjE2ODI4MTAsIm5iZiI6MTcyMTY4MjgxMCwiZXhwIjoxNzIxNjg2NDEwfQ.F-XzxOyJB97sTYTZXr-0JSCIXvLX9TMFNU0viTo9PqGkTYisXiNdp9YOBpFrH1pm-QFWteElKXME7ebfAjZry6E5MRVKjR0sVPECijHzvVjFKOsstjsAXpaZMhIV8hA2p9dJ4RxFvHTrVnXG1Rt2FfYbxS8qh5yAq6KquYDm_YzXeuS7S4rcj43alxjnAAsJxFiOyYclEGxqv9BknOLJ4ahJBptBaLA_CuwEyd6kxwep-aeolKX4KmZ5qToFTUu3FWGFiLnweE2dTFRdBHqjHWxUD_o-oebb5CUcKyKAP9VCD7A8q1m4-qk7icN3_uzuaDrjAOY6EMAzYKybOz6dHA';

decodeJWT(token);
