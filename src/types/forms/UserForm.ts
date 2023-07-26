import { string, z } from 'zod'
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

export const UserLoginFormSchema = z.object({
  email: z.string().nonempty("nonempty").refine(value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), {
    message: "email",
    path: ['email'], 
  }),
  password: z.string().nonempty("nonempty"),
});

export const UserForgetFormSchema = z.object({
  email: z.string().nonempty("nonempty").refine(value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), {
    message: "email",
    path: ['email'], 
  }),
});

export const UserResetFormSchema = z.object({
  new_password: z.string().min(8, "min8").nonempty("nonempty"),
  re_new_password: z.string().nonempty("nonempty"),
  uid: z.string(),
  token: z.string(),
  
}).refine(data => data.new_password === data.re_new_password, {
  message: "passwordNotMatch",
  path: ['re_password'],
});

export type UserFrom = z.infer<typeof UserFormSchema>
export type UserLoginFrom = z.infer<typeof UserLoginFormSchema>
export type UserForgetForm = z.infer<typeof UserForgetFormSchema>
export type UserResetForm = z.infer<typeof UserResetFormSchema>
