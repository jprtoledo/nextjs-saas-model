'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { ErrorText, Strong, Text, TextLink } from '@/components/text'
import { ResetPasswordFormSchema } from '@/lib/zod/resetPasswordFormSchema';
// import { Logo } from './logo'

export default function LoginPage() {
  const router = useRouter();
  const [resetPasswordForm, setResetPasswordForm] = useState({
    password: '',
    token: ''
  })
  const [errors, setErrors] = useState<{
    password?: string[] | undefined;
    request?: string | undefined
  }>({})

  useEffect(() => {
    setErrors({...errors, password: undefined})
  }, [resetPasswordForm])
  
  useEffect(() => {
    const token = window.location.search.split('=')[1];
    if (token) {
      setResetPasswordForm({...resetPasswordForm, token: token})
    }
  }, [])

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedFields = ResetPasswordFormSchema.safeParse({
      password: resetPasswordForm.password,
    })

    if (!validatedFields.success) {
      setErrors(validatedFields.error.flatten().fieldErrors)
      console.log(validatedFields.error.flatten().fieldErrors)
      return;
    }

    try {
      const response = await fetch('/api/auth/reset/token', {
        method: 'POST',
        body: JSON.stringify(resetPasswordForm),
      });
      const data = await response.json();
      if (data.error) throw data.error;
      router.push('/auth/login');

    } catch (error: any) {
      setErrors({...errors, request: error.message});
    }

  };

  return (
    <AuthLayout>
      <form className="grid w-full max-w-sm grid-cols-1 gap-8">
        {/* <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" /> */}
        <Heading>Redefina sua senha</Heading>
        <Field>
          <Label>Senha</Label>
          <Input type="password" name="password" autoComplete="new-password" value={resetPasswordForm.password} onChange={(e) => setResetPasswordForm({ ...resetPasswordForm, password: e.target.value })} />
        </Field>
        {errors.password && <ErrorText className='-mt-6'>{errors.password[0]}</ErrorText>}
        {errors.request && <ErrorText className='-mt-6'>{errors.request[0]}</ErrorText>}
        <Button type="submit" className="w-full" onClick={handleResetPassword}>
          Redefinir senha
        </Button>
        <Text>
          Já tem uma conta?{' '}
          <TextLink href="/auth/login">
            <Strong>Entrar</Strong>
          </TextLink>
        </Text>
      </form>
    </AuthLayout>
  );
} 