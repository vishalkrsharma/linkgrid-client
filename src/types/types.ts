export type UserType = {
  _id: string;
  imageUrl: string | null;
  username: string;
  name: string | null;
  email: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export type ApiResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type GridLinkType = {
  title: string;
  url: string;
};

export type GridType = {
  _id: string;
  userId: string;
  identifier: string;
  links: GridLinkType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
