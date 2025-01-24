import { Dispatch, SetStateAction } from 'react';

export type ThemeColorsType =
  | 'Zinc'
  | 'Red'
  | 'Rose'
  | 'Orange'
  | 'Green'
  | 'Blue'
  | 'Yellow'
  | 'Violet';

export interface ThemeColorStateParamsType {
  themeColor: ThemeColorsType;
  setThemeColor: Dispatch<SetStateAction<ThemeColorsType>>;
}
