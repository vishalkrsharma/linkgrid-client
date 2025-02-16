'use server';

import { authApi } from '@/lib/auth-api';
import { GridFormType } from '@/schemas/grid.schema';
import {
  ApiResponseType,
  GridListType,
  GridPublicType,
  GridType,
} from '@/types/types';

export const getGrids = async (): Promise<ApiResponseType<GridListType[]>> => {
  try {
    const res = await authApi.get('/grids');

    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getGridById = async ({
  id,
}: {
  id: string;
}): Promise<ApiResponseType<GridType>> => {
  try {
    const res = await authApi.get('/grids/' + id);

    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getGridByIdentifier = async ({
  identifier,
}: {
  identifier: string;
}): Promise<ApiResponseType<GridPublicType>> => {
  try {
    const res = await authApi.get('/grids/public/' + identifier);

    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateGrid = async ({ values }: { values: GridFormType }) => {
  try {
    const res = await authApi.patch('/grids/' + values._id, values);

    console.log(res.data);

    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
