import { serialize } from 'cookie'
import { sign } from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const MAX_AGE = 60 * 60 * 24 * 30 // days;

export async function POST(request: Request) {
  const body = await request.json()

  const { username, password } = body

  if (!username || !password) {
    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    )
  }

  // Always check this
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || ''

  const token = sign(
    {
      username,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  )

  const COOKIE_NAME = 'cookiename'
  const seralized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE,
    path: '/',
  })

  const response = {
    message: 'Authenticated!',
  }

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Set-Cookie': seralized },
  })
}
