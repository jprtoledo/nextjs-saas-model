import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { encrypt } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const { email, password } = await request.json();  
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Senha inválida' }, { status: 401 });
  }

  const {accessToken, refreshToken} = await encrypt({
    sub: user.id,
    email: user.email,
    name: user.name,
    currentPlan: user.currentPlan,
  })

  cookieStore.set({
    name: 'access-token', 
    value: accessToken,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })
  
  cookieStore.set({
    name: 'refresh-token', 
    value: refreshToken,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
  })

  return NextResponse.json({ status: 200 });
}