'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { signinFormSchema, SigninFormType } from '@/schemas/auth.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Eye, EyeClosed } from 'lucide-react';
import { signinAction } from '@/app/actions/auth.action';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const SigninForm = () => {
  const router = useRouter();
  const [passwordFieldType, setPasswordFieldType] = useState('password');
  const { toast } = useToast();
  const form = useForm<SigninFormType>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: SigninFormType) => {
    const res = await signinAction(values);

    if (res.success) {
      router.replace('/dashboard');
    }

    toast({
      description: res.message,
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
          name='identifier'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username/Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter username or email...'
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
                  rightButton={
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
        <Button type='submit' className='w-full' isLoading={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
