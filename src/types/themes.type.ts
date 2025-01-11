import { Dispatch, SetStateAction } from 'react';

export type ThemeColors =
  | 'Zinc'
  | 'Red'
  | 'Rose'
  | 'Orange'
  | 'Green'
  | 'Blue'
  | 'Yellow'
  | 'Violet';

export interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: Dispatch<SetStateAction<ThemeColors>>;
}
