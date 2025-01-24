'use client';
import setGlobalColorTheme from '@/lib/theme-colors';
import {
  ThemeColorsType,
  ThemeColorStateParamsType,
} from '@/types/themes.type';
import { useTheme } from 'next-themes';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext<ThemeColorStateParamsType>(
  {} as ThemeColorStateParamsType,
);

export default function ThemeDataProvider({ children }: any) {
  const getSavedThemeColor = () => {
    try {
      return (localStorage.getItem('themeColor') as ThemeColorsType) || 'Zinc';
    } catch (error) {
      'Zinc' as ThemeColorsType;
    }
  };

  const [themeColor, setThemeColor] = useState<ThemeColorsType>(
    getSavedThemeColor() as ThemeColorsType,
  );
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
    setGlobalColorTheme(theme as 'light' | 'dark', themeColor);

    if (!isMounted) {
      setIsMounted(true);
    }
  }, [themeColor, theme]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
