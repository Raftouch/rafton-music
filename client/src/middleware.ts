import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // continue if authenticated
  return NextResponse.next()
}

export const config = {
  matcher: ['/songs/:path*'],
}
