'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema, SignupFormType } from '@/schemas/auth.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Eye, EyeClosed } from 'lucide-react';
import { signupAction } from '@/actions/auth.action';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [passwordFieldType, setPasswordFieldType] = useState('password');
  const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
    useState('password');
  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: SignupFormType) => {
    const res = await signupAction(values);

    if (res.success) {
      router.replace('/dashboard');
    }

    toast({
      description: res.message,
      variant: res.success ? 'default' : 'destructive',
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 w-[20rem]'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter username...'
                  className='bg-background text-foreground'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter email...'
                  className='bg-background text-foreground'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type={passwordFieldType}
                  placeholder='Enter password...'
                  className='bg-background text-foreground'
                  rightElement={
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className='bg-transparent aspect-square rounded-md p-0'
                      onClick={() =>
                        setPasswordFieldType(
                          passwordFieldType === 'password'
                            ? 'text'
                            : 'password',
                        )
                      }
                    >
                      {passwordFieldType === 'password' ? (
                        <EyeClosed />
                      ) : (
                        <Eye />
                      )}
                    </Button>
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type={confirmPasswordFieldType}
                  placeholder='Confirm password...'
                  className='bg-background text-foreground'
                  rightElement={
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className='bg-transparent aspect-square rounded-md p-0'
                      onClick={() =>
                        setConfirmPasswordFieldType(
                          confirmPasswordFieldType === 'password'
                            ? 'text'
                            : 'password',
                        )
                      }
                    >
                      {confirmPasswordFieldType === 'password' ? (
                        <EyeClosed />
                      ) : (
                        <Eye />
                      )}
                    </Button>
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full' isLoading={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
