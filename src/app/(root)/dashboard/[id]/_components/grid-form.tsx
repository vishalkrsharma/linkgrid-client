'use client';

import { GridType } from '@/types/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Trash } from 'lucide-react';
import { gridFormSchema, GridFormType } from '@/schemas/grid.schema';
import { updateGrid } from '@/actions/grid.action';
import { clear } from 'console';

const GridForm = ({ grid }: { grid: GridType }) => {
  const { toast } = useToast();

  const form = useForm<GridFormType>({
    resolver: zodResolver(gridFormSchema),
    defaultValues: {
      _id: grid._id || '',
      userId: grid.userId || '',
      identifier: grid.identifier || '',
      links: grid.links || [{ title: '', url: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'links',
  });

  const onSubmit = async (values: GridFormType) => {
    try {
      const data = await updateGrid({ values });

      console.log(data);

      toast({
        description: data.message,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        description: error.response.data.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='identifier'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identifier</FormLabel>
              <FormControl>
                <Input placeholder='Enter identifier...' {...field} />
              </FormControl>
              <FormDescription>
                This is the identifier for the grid.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='links'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between item-center'>
                <FormLabel>Links</FormLabel>
                <Button
                  type='button'
                  variant='secondary'
                  size='icon'
                  onClick={() => append({ title: '', url: '' })}
                >
                  <Plus />
                </Button>
              </div>

              {fields.map((link, index) => (
                <div
                  key={index}
                  className='flex justify-center items-start gap-4'
                >
                  <FormField
                    control={form.control}
                    name={`links.${index}.title`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormControl>
                          <Input placeholder='Enter title...' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`links.${index}.url`}
                    render={({ field }) => (
                      <FormItem className='flex-1'>
                        <FormControl>
                          <Input placeholder='Enter URL...' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    onClick={() => remove(index)}
                    variant='destructive'
                    size='icon'
                    disabled={fields.length === 1}
                  >
                    <Trash />
                  </Button>
                </div>
              ))}
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          {grid._id ? 'Update Grid' : 'Create Grid'}
        </Button>
      </form>
    </Form>
  );
};

export default GridForm;
