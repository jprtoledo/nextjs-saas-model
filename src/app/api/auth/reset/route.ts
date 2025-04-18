import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createResetPasswordToken } from "@/lib/auth/resetPassword";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { email } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const resetPasswordToken = await createResetPasswordToken({
    sub: user.id,
    now: new Date().toISOString(),
  })

  // TODO: Send email with reset password link
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Busque Milhas <admin@busquemilhas.com>",
    to: user.email,
    subject: 'Redefinição de senha',
    text: `Clique no link abaixo para redefinir sua senha: ${process.env.NEXT_PUBLIC_APP_URL}/auth/reset/token?token=${resetPasswordToken}`,
  };

  await transporter.sendMail(mailOptions);

  return NextResponse.json({ message: 'Email de redefinição de senha enviado' }, { status: 200 });
}