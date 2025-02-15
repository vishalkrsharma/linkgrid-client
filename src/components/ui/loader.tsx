'use client'

import { cn } from '@/lib/utils';
import { useThemeContext } from '@/providers/theme-provider';
import { BeatLoader } from 'react-spinners';

const Loader = ({ className }: { className?: string }) => {
  const { themeColor } = useThemeContext();

  return <BeatLoader color={themeColor} className={cn('', className)} />;
};

export default Loader;
