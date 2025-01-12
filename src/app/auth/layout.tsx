import { ThemeColorToggle } from '@/components/ui/theme-color-toggle';
import Header from './_components/header';
import { ThemeModeToggle } from '@/components/ui/theme-mode-toggle';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='h-screen flex justify-center items-stretch'>
      <Header title='LinkGrid' tagline='Your personalized link hub' />
      <div className='flex-1 flex justify-center items-center relative'>
        {children}
        <div className='absolute bottom-4 right-4 flex gap-2'>
          <ThemeColorToggle />
          <ThemeModeToggle />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
