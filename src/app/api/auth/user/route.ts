import { decrypt } from '@/lib/auth/session';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access-token')?.value

  if (!accessToken) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 });
  }

  const user = await decrypt(accessToken)

  if (!user) {
    return NextResponse.json({ error: 'No user' }, { status: 401 });
  }

  return NextResponse.json(user);
}

