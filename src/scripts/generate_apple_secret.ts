import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Type definitions for Apple Auth Configuration
interface AppleAuthConfig {
  teamId: string;
  clientId: string;
  keyId: string;
  privateKeyPath: string;
}

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const generateAppleSecret = (config: AppleAuthConfig): string => {
  const { teamId, clientId, keyId, privateKeyPath } = config;

  const privateKey = fs.readFileSync(privateKeyPath).toString();

  const now = Math.floor(Date.now() / 1000);

  const payload = {
    iss: teamId,
    iat: now,
    exp: now + 86400 * 180, // 180 days
    aud: 'https://appleid.apple.com',
    sub: clientId,
  };

  const headers = {
    alg: 'ES256',
    kid: keyId,
  };

  return jwt.sign(payload, privateKey, { algorithm: 'ES256', header: headers });
};

const config: AppleAuthConfig = {
  teamId: process.env.APPLE_TEAM_ID ?? '',
  clientId: process.env.AUTH_APPLE_ID ?? '',
  keyId: process.env.APPLE_KEY_ID ?? '',
  privateKeyPath: path.resolve(__dirname, process.env.APPLE_PRIVATE_KEY_PATH ?? ''),
};

if (!config.teamId || !config.clientId || !config.keyId || !config.privateKeyPath) {
  console.error('Missing necessary Apple configuration');
  process.exit(1);
}

const appleSecret = generateAppleSecret(config);
console.log(`Your Apple Secret:\n\n${appleSecret}\n`);
