import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  cookieStore.delete('access-token');
  cookieStore.delete('refresh-token');

  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}
