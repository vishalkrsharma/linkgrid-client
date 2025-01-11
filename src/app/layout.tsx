import type { Metadata } from 'next';
import './globals.css';
import { notoSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import ThemeDataProvider from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(notoSans.variable, 'antialiased font-noto-sans')}>
        <NextThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <ThemeDataProvider>{children}</ThemeDataProvider>
          <Toaster />
        </NextThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
