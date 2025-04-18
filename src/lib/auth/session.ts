import 'server-only'
import { SignJWT, jwtVerify, JWTPayload } from 'jose'

const accessSecret = process.env.ACCESS_SECRET
const refreshSecret = process.env.REFRESH_SECRET
const encodedAccessKey = new TextEncoder().encode(accessSecret)
const encodedRefreshKey = new TextEncoder().encode(refreshSecret)

export async function encrypt(payload: JWTPayload) {
  return {
    accessToken: await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(encodedAccessKey),
    refreshToken: await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(encodedRefreshKey)
  }
}

export async function decryptRefresh(session: string) {
  const { payload } = await jwtVerify(session, encodedRefreshKey, {
    algorithms: ['HS256'],
  })

  return payload
}

export async function decrypt(session: string) {
  const { payload } = await jwtVerify(session, encodedAccessKey, {
    algorithms: ['HS256'],
  })
  return payload
}