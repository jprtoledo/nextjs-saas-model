import { z } from 'zod'

export const ResetPasswordFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Senha precisa ter 8 Caracteres' })
    .regex(/[a-zA-Z]/, { message: 'Senha precisa ter ao menos uma Letra.' })
    .regex(/[0-9]/, { message: 'Senha precisa ter ao menos um Número.' })
    .trim(),
})

export type FormState = {
  errors?: {
    password?: string[]
  }
  message?: string
} | undefined