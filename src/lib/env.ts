import { z } from 'zod';

const envSchema = z.object({
  SERVER_URL: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
