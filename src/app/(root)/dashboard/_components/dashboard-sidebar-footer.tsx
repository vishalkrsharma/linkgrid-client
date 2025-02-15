import ProfileDropdown from '@/components/profile-dropdown';
import { UserType } from '@/types/types';
import { cookies } from 'next/headers';

const DashboardSidebarFooter = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user')?.value;
  const user = userCookie ? (JSON.parse(userCookie) as UserType) : null;

  return <ProfileDropdown user={user!} />;
};

export default DashboardSidebarFooter;
