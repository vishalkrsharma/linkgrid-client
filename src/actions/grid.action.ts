import { authApi } from '@/lib/auth-api';
import { ApiResponseType, GridType } from '@/types/types';

export const getGrids = async (): Promise<ApiResponseType<GridType[]>> => {
  try {
    const res = await authApi.get('/grids');

    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
