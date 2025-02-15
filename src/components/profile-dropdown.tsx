'use client';

import { UserType } from '@/types/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Avatar from '@/components/avatar';
import { signoutAction } from '@/actions/auth.action';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const ProfileDropdown = ({ user }: { user: UserType }) => {
  const { toast } = useToast();
  const router = useRouter();
  const signout = async () => {
    const res = await signoutAction();

    if (res.success) router.replace('/auth/signin');

    toast({
      description: res.message,
      variant: res.success ? 'default' : 'destructive',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex justify-start items-center gap-2 rounded-full hover:bg-muted p-2'>
        <Avatar username={user.username} imageUrl={user.imageUrl} />
        <span>{user.username}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-full'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signout}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
