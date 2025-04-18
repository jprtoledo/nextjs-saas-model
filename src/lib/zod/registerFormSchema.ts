import { z } from 'zod'

export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Email Inválido.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Senha precisa ter 8 Caracteres' })
    .regex(/[a-zA-Z]/, { message: 'Senha precisa ter ao menos uma Letra.' })
    .regex(/[0-9]/, { message: 'Senha precisa ter ao menos um Número.' })
    .trim(),
})

export type FormState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string
} | undefined