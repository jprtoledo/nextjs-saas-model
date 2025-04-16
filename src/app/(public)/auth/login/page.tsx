'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { Strong, Text, TextLink, ErrorText } from '@/components/text'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (error) throw error;
      router.push('/dashboard');
    } catch (error) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <AuthLayout>
      <form action="#" method="POST" className="grid w-full max-w-sm grid-cols-1 gap-8">
        {/* <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" /> */}
        <Heading>Entrar na sua conta</Heading>
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field>
          <Label>Senha</Label>
          <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <div className="flex flex-row-reverse justify-between">
          <Text>
            <TextLink href="/auth/reset">
              <Strong>Esqueceu sua senha?</Strong>
            </TextLink>
          </Text>
          {error && <ErrorText className='-mt-6'>{error}</ErrorText>}
        </div>
        <Button type="submit" className="w-full" onClick={handleLogin}>
          Login
        </Button>
        <Text>
          Não tem uma conta?{' '}
          <TextLink href="/auth/register">
            <Strong>Criar conta</Strong>
          </TextLink>
        </Text>
      </form>
    </AuthLayout>
  );
} 