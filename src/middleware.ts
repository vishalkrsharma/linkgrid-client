import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import { env } from '@/lib/env';
import { cookies } from 'next/headers';
import { api } from '@/lib/api';

export const isAuthenticated = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string | null;
  refreshToken: string | null;
}): Promise<boolean> => {
  const cookieStore = await cookies();
  if (!accessToken || !refreshToken) return false;
  try {
    await jose.jwtVerify(
      accessToken,
      new TextEncoder().encode(env.JWT_ACCESS_SECRET),
    );

    return true;
  } catch (accessTokenError) {
    cookieStore.delete('accessToken');
    if (accessTokenError instanceof jose.errors.JWTExpired) {
      try {
        await jose.jwtVerify(
          refreshToken,
          new TextEncoder().encode(env.JWT_REFRESH_SECRET),
        );

        const { data } = await api('/auth/refresh', {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        cookieStore.set('accessToken', data.data.accessToken);
        cookieStore.set('refreshToken', data.data.refreshToken);

        return true;
      } catch (refreshTokenError) {
        cookieStore.delete('refreshToken');
        console.error('Refresh token expired or invalid:', refreshTokenError);
        return false;
      }
    }

    console.error('JWT Verification Error:', accessTokenError);
    return false;
  }
};

export async function middleware(request: NextRequest) {
  const accessTokenCookie = request.cookies.get('accessToken');
  const refreshTokenCookie = request.cookies.get('refreshToken');
  const accessToken = accessTokenCookie ? accessTokenCookie.value : null;
  const refreshToken = refreshTokenCookie ? refreshTokenCookie.value : null;
  const authRoutes = ['/auth/signin', '/auth/signup'];
  const dashboardRoutes = ['/dashboard'];
  const cookieStore = await cookies();

  const isAuth = await isAuthenticated({ accessToken, refreshToken });

  console.log('isAuth:', isAuth);

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
