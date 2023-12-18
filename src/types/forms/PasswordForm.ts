// Please use this file if need form type

import { z } from 'zod';
import { Timestamp } from 'types/others/Timestamp';
import { PasswordGroupSchema, PasswordTagSchema } from 'types/models/Password';

export const PasswordFormSchema = z.object({
  id: z.number().optional(),
  user: z.number(),
  title: z.string().nonempty(),
  password: z.string().nonempty(),
  email: z.union([z.string().email(), z.literal(''), z.null()]),
  website: z.string().nullable(),
  tag: z.union([z.literal(''), z.number().nullable(), PasswordTagSchema.optional()]),
  group: z.union([z.literal(''), z.number().nullable(), PasswordGroupSchema.optional()]),
  notes: z.string().nullable(),
  createdAt: Timestamp,
});

export type PasswordForm = z.infer<typeof PasswordFormSchema>;
