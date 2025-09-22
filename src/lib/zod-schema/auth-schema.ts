import z from "zod";


export type RegisterType = z.infer<typeof RegisterSchema>

export const RegisterSchema = z.object({
    name: z.string().min(1, 'name field is required'),
    email: z.string().email('email field is required'),
    password: z.string().min(1, 'password field is required'),
})