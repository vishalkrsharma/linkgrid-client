import Brand from '@/components/brand';
import Loader from '@/components/ui/loader';
import NavLinks from '@/components/ui/nav-links';
import { lazy, Suspense } from 'react';

const NavProfile = lazy(() => import('@/components/nav-profile'));

const Navbar = () => {
  return (
    <nav
      className='flex justify-center item-center border-b shadow-sm bg-background fixed top-0
        w-full z-50 h-[60px]'
    >
      <div
        className='w-full max-w-screen-2xl max-[1537px]:px-4 mx-auto py-2 flex justify-between
          items-center gap-4'
      >
        <Brand logoClassName='w-10' brandClassName='text-2xl' />
        <NavLinks />
        <Suspense fallback={<Loader />}>
          <NavProfile />
        </Suspense>
      </div>
    </nav>
  );
};

export default Navbar;
