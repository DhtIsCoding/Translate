import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing } from './i18n/routing'
import { auth0 } from './lib/auth0'

const intlMiddleware = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  const authResponse = await auth0.middleware(request)
  // 特殊处理auth0的请求
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return authResponse
  }

  const session = await auth0.getSession(request)

  if (!session) {
    // user is not authenticated, redirect to login page
    return NextResponse.redirect(new URL('/', request.nextUrl.origin))
  }

  const intlResponse = intlMiddleware(request)

  for (const [key, value] of authResponse.headers) {
    intlResponse.headers.set(key, value)
  }

  return intlResponse
}

export const config = {
  matcher: [
    '/',
    '/(zh|en)/:path*',
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
