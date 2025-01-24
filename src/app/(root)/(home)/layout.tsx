import Navbar from '@/components/navbar';
import { ReactNode } from 'react';

const HomeLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className='overflow-hidden h-screen'>
      <Navbar />
      {children}
    </main>
  );
};

export default HomeLayout;
