import { NextApiRequest, NextApiResponse } from 'next';
import { encrypt } from '../../utils/cipher';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text } = req.body;
  const encryptedText = encrypt(text);
  return res.status(200).json({ encryptedText });
}