import Link from 'next/link';
import UsernameInput from './username-input';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

const UserRedirect = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user')?.value;

  const user = userCookie ? JSON.parse(userCookie) : null;

  return (
    <div>
      {user ? (
        <Link href='/dashboard'>
          <Button className='text-white group'>
            Dashboard
            <ArrowRightIcon className='group-hover:translate-x-1 transition-transform' />
          </Button>
        </Link>
      ) : (
        <UsernameInput />
      )}
    </div>
  );
};

export default UserRedirect;
