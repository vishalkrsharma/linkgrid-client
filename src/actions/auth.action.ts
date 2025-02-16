'use server';

import { api } from '@/lib/api';
import { SigninFormType, SignupFormType } from '@/schemas/auth.schema';
import { cookies } from 'next/headers';

export const signupAction = async (values: SignupFormType) => {
  const cookieStore = await cookies();
  try {
    const { data } = await api.post('/auth/signup', values);

    cookieStore.set('accessToken', data.data.tokens.accessToken);
    cookieStore.set('refreshToken', data.data.tokens.refreshToken);
    cookieStore.set('user', JSON.stringify(data.data.user));

    return { success: true, message: data.message };
  } catch (error: any) {
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};

export const signinAction = async (values: SigninFormType) => {
  const cookieStore = await cookies();
  try {
    const { data } = await api.post('/auth/signin', values);

    cookieStore.set('accessToken', data.data.tokens.accessToken);
    cookieStore.set('refreshToken', data.data.tokens.refreshToken);
    cookieStore.set('user', JSON.stringify(data.data.user));

    return { success: true, message: data.message };
  } catch (error: any) {
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};

export const signoutAction = async () => {
  try {
    const cookieStore = await cookies();

    await api.get('/auth/signout');

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('user');

    return { success: true, message: 'Sign out successful' };
  } catch (error: any) {
    return { success: true, message: 'Sign out failed' };
  }
};
