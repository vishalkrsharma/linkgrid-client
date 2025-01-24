import ProfileDropdown from '@/components/profile-dropdown';
import { Button } from '@/components/ui/button';
import { ThemeColorToggle } from '@/components/ui/theme-color-toggle';
import { ThemeModeToggle } from '@/components/ui/theme-mode-toggle';
import { UserType } from '@/types/types';
import { cookies } from 'next/headers';
import Link from 'next/link';

const NavProfile = async () => {
  const cookieStore = await cookies();

  const userCookie = cookieStore.get('user')?.value;
  const user = userCookie ? (JSON.parse(userCookie) as UserType) : null;

  return (
    <section className='flex justify-center items-center gap-4'>
      <ThemeColorToggle />
      <ThemeModeToggle />
      {/* {user ? (
        <ProfileDropdown user={user} />
      ) : (
        <> */}
      <Link href='/auth/signin'>
        <Button variant='link' type='button'>
          Sign in
        </Button>
      </Link>
      <Link href='/auth/signup'>
        <Button variant='link' type='button'>
          Sign up
        </Button>
      </Link>
      {/* </>
      )} */}
    </section>
  );
};

export default NavProfile;
