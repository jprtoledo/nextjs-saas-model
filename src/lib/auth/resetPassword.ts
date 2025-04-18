import { SignJWT, JWTPayload, jwtVerify } from "jose";
const encodedAccessKey = new TextEncoder().encode(process.env.ACCESS_SECRET)

export async function createResetPasswordToken(payload: JWTPayload) {
  return await new SignJWT(payload)
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setExpirationTime('1h')
  .sign(encodedAccessKey)
}

export async function verifyResetPasswordToken(token: string) {
  return await jwtVerify(token, encodedAccessKey)
}