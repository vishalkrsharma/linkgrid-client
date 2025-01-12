'use client';

import Brand from '@/components/brand';
import { cn } from '@/lib/utils';
import { useThemeContext } from '@/providers/theme-provider';

const Header = ({ title, tagline }: { title: string; tagline?: string }) => {
  const { themeColor } = useThemeContext();

  return (
    <header
      className={cn(
        'flex-1 flex justify-center item-center flex-col gap-4 text-center bg-primary',
        ['Zinc', 'Yellow'].includes(themeColor)
          ? 'text-background'
          : 'text-white',
      )}
    >
      <Brand />
      <div>{tagline}</div>
    </header>
  );
};

export default Header;
