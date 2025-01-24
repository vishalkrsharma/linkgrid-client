import { signoutAction } from '@/actions/auth.action';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';

export const authApi = api;

authApi.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    const token = tokenCookie ? tokenCookie.value : null;

    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    else await signoutAction();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
