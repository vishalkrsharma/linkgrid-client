import { signoutAction } from '@/actions/auth.action';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';

export const authApi = api;

authApi.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const accessTokenCookie = cookieStore.get('accessToken');
    const accessToken = accessTokenCookie ? accessTokenCookie.value : null;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else await signoutAction();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
