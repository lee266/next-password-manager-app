import { z } from 'zod'
import { Timestamp } from 'types/others/Timestamp'

export const UserFormSchema = z.object({
  username: z.string().nonempty("nonempty"),
  email: z.string().nonempty("nonempty").refine(value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), {
    message: "email",
    path: ['email'], 
  }),
  password: z.string().min(8, "min8").nonempty("nonempty"),
  re_password: z.string().nonempty("nonempty"),
  createAt: Timestamp
}).refine(data => data.password === data.re_password, {
  message: "passwordNotMatch",
  path: ['re_password'],
});

export type UserFrom = z.infer<typeof UserFormSchema>
