import { z } from 'zod';

export const Timestamp = z.union([z.string(), z.date()]).optional();
export type Timestamp = z.infer<typeof Timestamp>;
