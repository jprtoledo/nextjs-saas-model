'use client';

import { useState } from 'react';

import { AuthLayout } from '@/components/auth-layout'
import { Button } from '@/components/button'
import { Field, Label } from '@/components/fieldset'
import { Heading } from '@/components/heading'
import { Input } from '@/components/input'
import { ErrorText, Strong, Text, TextLink } from '@/components/text'
import { Notification } from '@/components/notification' 

// import { Logo } from './logo'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/reset', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setNotification(true);
      if (data.error) throw data.error;
    } catch (error) {
      setError('Erro ao redefinir senha');
    }
  };

  return (
    <AuthLayout>
      <form action="" method="POST" className="grid w-full max-w-sm grid-cols-1 gap-8">
        {/* <Logo className="h-6 text-zinc-950 dark:text-white forced-colors:text-[CanvasText]" /> */}
        <Heading>Redefinir sua senha</Heading>
        <Text>Digite seu email e você receberá um link para redefinir sua senha.</Text>
        <Field>
          <Label>Email</Label>
          <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Button type="submit" className="w-full" onClick={handleResetPassword}>
          Redefinir senha
        </Button>
        <Text>
          Não tem uma conta?{' '}
          <TextLink href="/auth/register">
            <Strong>Criar conta</Strong>
          </TextLink>
        </Text>
        {error && <ErrorText className='-mt-6'>{error}</ErrorText>}
      </form>
      <Notification
        type="success"
        title="Senha redefinida com sucesso"
        message="Você receberá um email com um link para redefinir sua senha."
        show={notification} onClose={() => setNotification(false)}      />
    </AuthLayout>
  );
} 