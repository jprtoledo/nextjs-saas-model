import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = await createAdminClient();

  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  cookieStore.set('access-token', data.session!.access_token);
  cookieStore.set('refresh-token', data.session!.refresh_token);

  return NextResponse.json(data);
}