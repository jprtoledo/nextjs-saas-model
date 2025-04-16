import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const supabase = await createAdminClient();
  const cookieStore = await cookies();

  cookieStore.delete('access-token');
  cookieStore.delete('refresh-token');

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
}
