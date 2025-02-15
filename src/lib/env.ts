import { z } from 'zod';

const envSchema = z.object({
  SERVER_URL: z.string().nonempty(),
  JWT_ACCESS_SECRET: z.string().nonempty(),
  JWT_REFRESH_SECRET: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
