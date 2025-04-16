import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  const supabase = await createAdminClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ error: error.message, code: error.code, name: error.name }, { status: error.status });
  }

  return NextResponse.json(data.user);
}

