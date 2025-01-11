import { z } from 'zod';

export const signinFormSchema = z.object({
  identifier: z.string({ required_error: 'Username or email is required' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(4, { message: 'Password must be at least 4 characters' }),
});

export const signupFormSchema = z
  .object({
    username: z.string({ required_error: 'Username is required' }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email',
      }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(4, { message: 'Password must be at least 4 characters' }),
    confirmPassword: z
      .string({
        required_error: 'Confirm Password is required',
      })
      .min(4, { message: 'Confirm Password must be at least 4 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  });

export type SigninFormType = z.infer<typeof signinFormSchema>;
export type SignupFormType = z.infer<typeof signupFormSchema>;
