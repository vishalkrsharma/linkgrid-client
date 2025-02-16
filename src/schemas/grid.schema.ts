import { z } from 'zod';

export const gridFormSchema = z.object({
  _id: z.string({
    required_error: 'Grid ID is required',
  }),
  userId: z.string({
    required_error: 'User ID is required',
  }),
  identifier: z
    .string({
      required_error: 'Identifier is required',
    })
    .min(4, 'Identifier must be at least 4 characters'),
  links: z
    .array(
      z.object({
        title: z.string({
          required_error: 'Title is required',
        }),
        url: z
          .string({
            required_error: 'URL is required',
          })
          .url('Invalid URL'),
      }),
    )
    .min(1, 'At least one link is required'),
});

export type GridFormType = z.infer<typeof gridFormSchema>;
