'use client';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Send } from 'lucide-react';

const formSchema = z.object({
  username: z
    .string({
      required_error: 'Username is requried',
    })
    .min(4)
    .max(20),
});

type FormType = z.infer<typeof formSchema>;

const UsernameInput = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = (values: FormType) => {
    router.push('/auth/signup?username' + values.username);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex justify-start items-stretch gap-2'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='yourname'
                  className='rounded-full text-white pl-7 py-5'
                  leftElement={<div className='text-gray-300'>@</div>}
                  rightElement={
                    <Button
                      type='submit'
                      variant='link'
                      size='icon'
                      className='rounded-full mr-px'
                    >
                      <Send className='text-white' />
                    </Button>
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default UsernameInput;
