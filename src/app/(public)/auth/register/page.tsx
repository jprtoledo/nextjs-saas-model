'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { ErrorText, Strong, Text, TextLink } from '@/components/text'
// import { Logo } from './logo'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.error) throw data.error;
      router.push('/dashboard');
    } catch (error: any) {
      if (error.code === 'user_already_exists') {
        setError('Usuário já existe');
      } else {
        setError('Erro ao criar conta');
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
          <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field>
          <Label>Senha</Label>
          <Input type="password" name="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        {error && <ErrorText className='-mt-6'>{error}</ErrorText>}
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