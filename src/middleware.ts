import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import { env } from '@/lib/env';

export const isAuthenticated = async (token?: string): Promise<boolean> => {
  if (!token) return false;
  try {
    await jose.jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET));
    return true;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const authRoutes = ['/auth/signin', '/auth/signup'];
  const dashboardRoutes = ['/dashboard'];

  const isAuth = await isAuthenticated(token);

  console.log('isAuth:', isAuth);

  // If user is unauthenticated and accessing a protected route
  if (
    !isAuth &&
    dashboardRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // If user is authenticated and accessing an auth route
  if (isAuth && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
};
