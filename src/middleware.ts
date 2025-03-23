import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import { env } from '@/lib/env';
import { api } from '@/lib/api';

export const isAuthenticated = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string | null;
  refreshToken: string | null;
}): Promise<boolean> => {
  if (!accessToken || !refreshToken) return false;

  try {
    await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode(env.JWT_ACCESS_SECRET),
    );
    return true;
  } catch (accessTokenError) {
    if (accessTokenError instanceof jose.errors.JWTExpired) {
      try {
        await jose.jwtVerify(
          refreshToken,
          new TextEncoder().encode(env.JWT_REFRESH_SECRET),
        );

        // Token refresh should be handled in an API route, not middleware
        const { data } = await api('/auth/refresh', {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        // Middleware cannot set cookies, so return new tokens to be set client-side
        return Boolean(data.data.accessToken);
      } catch {
        return false;
      }
    }
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value || null;
  const refreshToken = request.cookies.get('refreshToken')?.value || null;

  const authRoutes = ['/auth/signin', '/auth/signup'];
  const dashboardRoutes = ['/dashboard'];

  const isAuth = await isAuthenticated({ accessToken, refreshToken });

  console.log('isAuth:', isAuth);

  // Prevent infinite redirects
  if (
    !isAuth &&
    dashboardRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    const signinUrl = new URL('/auth/signin', request.url);
    if (request.nextUrl.pathname !== '/auth/signin') {
      return NextResponse.redirect(signinUrl);
    }
  }

  if (isAuth && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
};
