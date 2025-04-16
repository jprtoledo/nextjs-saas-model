import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const supabaseAdmin = await createAdminClient();

  const { data, error } = await supabaseAdmin.auth.refreshSession({ refresh_token: cookieStore.get('refresh-token')!.value });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  cookieStore.set('access-token', data.session!.access_token);
  cookieStore.set('refresh-token', data.session!.refresh_token);

  return NextResponse.json({ data, error });
}