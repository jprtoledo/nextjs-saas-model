import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decryptRefresh, encrypt } from '@/lib/auth/session';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  const oldRefreshToken = cookieStore.get('refresh-token')!.value

  const payload = await decryptRefresh(oldRefreshToken)

  if (!payload) {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.sub,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  const { accessToken, refreshToken: newRefreshToken } = await encrypt({
    sub: user.id,
    email: user.email,
    name: user.name,
    currentPlan: user.currentPlan,
  })

  cookieStore.set('access-token', accessToken)
  cookieStore.set('refresh-token', newRefreshToken)

  return NextResponse.json({ status: 200 });
}