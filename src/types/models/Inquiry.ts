import { z } from 'zod'
import { Timestamp } from 'types/others/Timestamp'

export const InquiryCategorySchema = z.object({
  id: z.number().optional(),
  category_name: z.string(),
  created_at: Timestamp,
  updated_at: Timestamp
})

export const InquirySchema = z.object({
  id: z.number().optional(),
  inquiry_content: z.string(),
  status: z.string(),
  inquiry_category: z.union([z.literal(""), z.number().nullable(), InquiryCategorySchema.optional()]),
  created_at: Timestamp,
  updated_at: Timestamp
})

export type Inquiry = z.infer<typeof InquirySchema>
export type InquiryCategory = z.infer<typeof InquiryCategorySchema>
