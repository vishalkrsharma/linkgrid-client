import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import { env } from '@/lib/env';
import { cookies } from 'next/headers';

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
  const cookieStore = await cookies();

  const isAuth = await isAuthenticated(token);

  if (
    !isAuth &&
    dashboardRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    cookieStore.delete('token');
    cookieStore.delete('user');

    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (isAuth && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
};
