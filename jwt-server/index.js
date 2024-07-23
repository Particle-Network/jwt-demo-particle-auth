const express = require('express');
const cors = require('cors');
const { generateKeyPair, exportJWK, exportPKCS8, exportSPKI, importPKCS8, importSPKI, SignJWT, jwtVerify } = require('jose');
const fs = require('fs').promises;

const app = express();
const PORT = 4000;

let PRIVATE_KEY, PUBLIC_KEY, PUBLIC_JWK;

// Where public and private keys are saved
const PRIVATE_KEY_PATH = './private_key.pem';
const PUBLIC_KEY_PATH = './public_key.pem';

// Simulate a user in a DB
const PREDETERMINED_USERNAME = 'David';
const PREDETERMINED_USER_ID = '1234567891';

// Enable CORS for all routes
app.use(cors());

/**
 * Initializes the RSA key pair. If existing keys are found, they are loaded. 
 * Otherwise, new keys are generated, saved, and loaded.
 */
async function initializeKeys() {
  try {
    console.log('Checking for existing keys...');
    // Attempt to read existing keys from files
    const privateKeyPem = await fs.readFile(PRIVATE_KEY_PATH, 'utf8');
    const publicKeyPem = await fs.readFile(PUBLIC_KEY_PATH, 'utf8');
    // Import the keys in PEM format
    PRIVATE_KEY = await importPKCS8(privateKeyPem, 'RS256');
    PUBLIC_KEY = await importSPKI(publicKeyPem, 'RS256');
    // Export the public key as a JWK (JSON Web Key)
    PUBLIC_JWK = await exportJWK(PUBLIC_KEY);
    PUBLIC_JWK.kid = '1'; // Key ID
    PUBLIC_JWK.use = 'sig'; // Usage is for signing
    console.log('Existing keys found and loaded.');
  } catch (error) {
    console.log('Existing keys not found. Generating new keys...');
    // Generate new RSA key pair
    const { publicKey, privateKey } = await generateKeyPair('RS256');
    PRIVATE_KEY = privateKey;
    PUBLIC_KEY = publicKey;
    PUBLIC_JWK = await exportJWK(publicKey);
    PUBLIC_JWK.kid = '1'; // Key ID
    PUBLIC_JWK.use = 'sig'; // Usage is for signing

    // Export keys to PEM format and save to files
    const privateKeyPem = await exportPKCS8(PRIVATE_KEY);
    const publicKeyPem = await exportSPKI(PUBLIC_KEY);

    await fs.writeFile(PRIVATE_KEY_PATH, privateKeyPem);
    await fs.writeFile(PUBLIC_KEY_PATH, publicKeyPem);
    console.log('New keys generated and saved.');
  }
}

/**
 * Decodes and verifies a JWT.
 * @param {string} token - The JWT token to decode.
 * @returns {Object} - The decoded payload if the token is valid.
 */
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

    return payload;
  } catch (error) {
    console.error('Failed to verify JWT:', error);
    throw new Error('Invalid token');
  }
}

/**
 * Starts the Express server and sets up the routes for JWT token issuance and JWKS.
 */
async function startServer() {
  await initializeKeys();

  app.use(express.json());

  /**
   * Endpoint to generate a JWT token with a static payload.
   */
  app.post('/token', async (req, res) => {
    if (!PRIVATE_KEY) {
      console.error('Keys not initialized yet.');
      return res.status(500).json({ error: 'Keys not initialized yet' });
    }

    const payload = {
      sub: '1234567891',
      name: 'Web3 User',
      iss: 'particle-network',
      aud: 'your-dapp.io',
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000)
    };

    // Sign the JWT
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256', kid: '1' })
      .setExpirationTime('1h')
      .sign(PRIVATE_KEY);

    console.log('JWT issued:', token);
    res.json({ token });
  });

  /**
   * Endpoint to serve the public keys in JWKS (JSON Web Key Set) format.
   */
  app.get('/.well-known/jwks.json', (req, res) => {
    if (!PUBLIC_JWK) {
      console.error('Keys not initialized yet.');
      return res.status(500).json({ error: 'Keys not initialized yet' });
    }

    const jwks = {
      keys: [PUBLIC_JWK]
    };

    console.log('JWKS served:', jwks);
    res.json(jwks);
  });

  /**
   * Endpoint to handle user login, verify the username, and generate a JWT if the username is valid.
   */
  app.post('/login', async (req, res) => {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    if (username !== PREDETERMINED_USERNAME) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    const payload = {
      sub: PREDETERMINED_USER_ID,
      name: username,
      iss: 'particle-network',
      aud: 'your-dapp.io',
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000)
    };

    // Sign the JWT for the valid user
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256', kid: '1' })
      .setExpirationTime('1h')
      .sign(PRIVATE_KEY);

    console.log('JWT issued for user:', username);
    res.json({ token });
  });

  /**
   * Endpoint to decode and verify a JWT token.
   */
  app.post('/decode', async (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    try {
      const payload = await decodeJWT(token);
      res.json({ payload });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();