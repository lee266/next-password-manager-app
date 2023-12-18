import { NextApiRequest, NextApiResponse } from 'next';
import { decrypt } from '../../utils/cipher';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body.data;

    // helper function to decrypt an array of data
    const decryptArray = (arr: any[]) =>
      arr.map((item: any) => {
        if (item.password) {
          try {
            const decryptedPassword = decrypt(item.password);
            return { ...item, password: decryptedPassword };
          } catch (e) {
            console.error(`Failed to decrypt password for item with id ${item.id}`);
          }
        }
        return item;
      });

    // Create a new object, mapping each key of the original data to the decrypted version of its array
    const decryptedData = Object.keys(data).reduce((acc: any, key: string) => {
      acc[key] = decryptArray(data[key]);
      return acc;
    }, {});

    return res.status(200).json(decryptedData);
  } catch (e) {
    console.error('Failed to decrypt data', e);
    return res.status(500).json({ error: 'Failed to decrypt data' });
  }
}
