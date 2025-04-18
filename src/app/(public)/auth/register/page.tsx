'use client';

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { ErrorText, Strong, Text, TextLink } from '@/components/text'
import { SignupFormSchema } from '@/lib/zod/registerFormSchema';
// import { Logo } from './logo'

export default function LoginPage() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<{
    email?: string[] | undefined;
    password?: string[] | undefined;
    request?: string | undefined
  }>({})

  useEffect(() => {
    setErrors({...errors, email: undefined, password: undefined})
  }, [registerForm])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const validatedFields = SignupFormSchema.safeParse({
      email: registerForm.email,
      password: registerForm.password,
    })

    if (!validatedFields.success) {
      setErrors(validatedFields.error.flatten().fieldErrors)
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerForm),
      });
      const data = await response.json();
      if (data.error) throw data.error;
      router.push('/dashboard');

    } catch (error: any) {
      if (error.code === 'user_already_exists') {
        setErrors({...errors, request: 'Usuário já existe'});
      } else {
        setErrors({...errors, request: 'Erro ao criar conta'});
      }
    }

  };

  return (
    <AuthLayout>
      <form className="grid w-full max-w-sm grid-cols-1 gap-8">
        {/* <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" /> */}
        <Heading>Crie sua conta</Heading>
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
        </Field>
        {errors.email && <ErrorText className='-mt-6'>{errors.email[0]}</ErrorText>}
        <Field>
          <Label>Senha</Label>
          <Input type="password" name="password" autoComplete="new-password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
        </Field>
        {errors.password && <ErrorText className='-mt-6'>{errors.password[0]}</ErrorText>}
        {errors.request && <ErrorText className='-mt-6'>{errors.request[0]}</ErrorText>}
        <Button type="submit" className="w-full" onClick={handleSignUp}>
          Criar conta
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