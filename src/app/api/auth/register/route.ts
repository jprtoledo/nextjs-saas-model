import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { encrypt } from '@/lib/auth/session';
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const { email, password } = await request.json();

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'Usuário já existe' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  
  const {accessToken, refreshToken} = await encrypt({
    sub: user.id,
    email: user.email,
    name: user.name,
    currentPlan: user.currentPlan,
  })

  cookieStore.set('access-token', accessToken);
  cookieStore.set('refresh-token', refreshToken);

  return NextResponse.json({ status: 200 });
}