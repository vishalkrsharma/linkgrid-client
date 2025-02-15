import { env } from '@/lib/env';
import axios from 'axios';

export const api = axios.create({
  baseURL: env.SERVER_URL + '/api',
  withCredentials: true,
});
