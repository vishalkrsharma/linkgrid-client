import { ThemeColorToggle } from '@/components/ui/theme-color-toggle';
import Header from './_components/header';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='h-[calc(100vh-60px)] flex justify-center items-stretch'>
      <Header tagline='Your personalized link hub' />
      <div className='flex-1 flex justify-center items-center relative'>
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
