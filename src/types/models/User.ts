import { z } from 'zod';
import { Timestamp } from 'types/others/Timestamp';

export const UserSchema = z.object({
  id: z.number().optional(),
  username: z.string(),
  email: z.string().email(),
  createAt: Timestamp,
});

export type User = z.infer<typeof UserSchema>;
