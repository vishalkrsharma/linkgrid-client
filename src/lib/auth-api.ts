import { signoutAction } from '@/actions/auth.action';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';

export const authApi = api;

authApi.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies(); // Removed `await` since `cookies()` is not async.
    const accessToken = cookieStore.get('accessToken')?.value || null;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      await signoutAction();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Flag to prevent multiple refresh requests at the same time
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value || null;

    // If the error is due to an expired token
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!refreshToken) {
        await signoutAction();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(authApi(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post('/auth/refresh', {
          refreshToken,
        });

        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;

        // Update cookies (Middleware can't set cookies, but API can)
        cookieStore.set('accessToken', newAccessToken);
        cookieStore.set('refreshToken', newRefreshToken);

        isRefreshing = false;
        refreshSubscribers.forEach((callback) => callback(newAccessToken));
        refreshSubscribers = [];

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        await signoutAction();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
