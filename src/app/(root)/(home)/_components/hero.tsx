import Container from '@/app/(root)/(home)/_components/container';
import UserRedirect from '@/app/(root)/(home)/_components/user-redirect';
import Loader from '@/components/ui/loader';
import { Suspense } from 'react';

const Hero = () => {
  return (
    <Container sectionClassName='h-[calc(100vh-60px)] bg-[#007F73] snap-start'>
      <header className='space-y-8 flex-1 text-[#D2FF72]'>
        <h1 className='text-5xl font-bold font-lora w-1/2'>
          Create your ultimate link hub with LinkGrid
        </h1>
        <p className='text-lg font-medium w-1/2'>
          One link to connect them all. Share your social profiles, websites,
          content, and more in a beautifully customizable grid.
        </p>
        <Suspense fallback={<Loader />}>
          <UserRedirect />
        </Suspense>
      </header>
    </Container>
  );
};

export default Hero;
