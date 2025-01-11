'use server';

import { api } from '@/lib/api';
import { SigninFormType, SignupFormType } from '@/schemas/auth.schema';
import { cookies } from 'next/headers';

export const signupAction = async (values: SignupFormType) => {
  const cookieStore = await cookies();
  try {
    const { data } = await api.post('/auth/signup', values);

    if (data.success) {
      cookieStore.set('token', data.token);
      cookieStore.set('user', JSON.stringify(data.user));
    }

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

    if (data.success) {
      cookieStore.set('token', data.token);
      cookieStore.set('user', JSON.stringify(data.user));
    }

    return { success: true, message: data.message };
  } catch (error: any) {
    return {
      success: error.response.data.success,
      message: error.response.data.message,
    };
  }
};
