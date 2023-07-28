import crypto from 'crypto';

// 256bit
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY as string, 'hex');
// AES algorithm[256bit, CBC mode: Cipher Block Chaining mode]
const ALGORITHM = 'aes-256-cbc';
const OUTPUT_ENCODING = 'hex';
const INPUT_ENCODING = 'utf8';

export function encrypt(text:string) {
  // IV should be random and unique for each encryption
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, INPUT_ENCODING, OUTPUT_ENCODING);
  encrypted += cipher.final(OUTPUT_ENCODING);
  return iv.toString(OUTPUT_ENCODING) + ':' + encrypted;
}

export function decrypt(text:string) {
  const parts = text.split(':');
  const ivHex = parts.shift();
  
  if (!ivHex) { throw new Error('Invalid encrypted text. No IV found.'); }
  
  const iv = Buffer.from(ivHex, OUTPUT_ENCODING);
  const encryptedText = parts.join(':');
  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText, OUTPUT_ENCODING, INPUT_ENCODING);
  decrypted += decipher.final(INPUT_ENCODING);
  return decrypted;
}