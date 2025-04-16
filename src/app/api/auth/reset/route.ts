import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { email } = await request.json();
  const supabase = await createAdminClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Email de redefinição de senha enviado' }, { status: 200 });
}