import { z } from 'zod';
import { Timestamp } from 'types/others/Timestamp';

const InquiryStatus = z.union([
  z.literal('UNREAD'),
  z.literal('READ'),
  z.literal('IN_PROGRESS'),
  z.literal('ANSWERED'),
  z.literal('CLOSED'),
]);

export const InquiryCategorySchema = z.object({
  id: z.number().optional(),
  category_name: z.string(),
  created_at: Timestamp,
  updated_at: Timestamp,
});

export const InquirySchema = z.object({
  id: z.number().optional(),
  inquiry_content: z.string(),
  status: InquiryStatus,
  inquiry_category: z.union([z.literal(''), z.number().nullable(), InquiryCategorySchema.optional()]),
  created_at: Timestamp,
  updated_at: Timestamp,
});

export type Inquiry = z.infer<typeof InquirySchema>;
export type InquiryCategory = z.infer<typeof InquiryCategorySchema>;
