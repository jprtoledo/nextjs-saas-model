import { NextRequest, NextResponse } from "next/server";
import { verifyResetPasswordToken } from "@/lib/auth/resetPassword";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { password, token } = await request.json();
  
  if (!token) {
    return NextResponse.json({ error: 'Token não encontrado' }, { status: 400 });
  }

  const { payload } = await verifyResetPasswordToken(token);

  if (!payload) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
  });

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ message: 'Senha redefinida com sucesso' }, { status: 200 });
}
