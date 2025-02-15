import DashboardSidebarFooter from '@/app/(root)/dashboard/_components/dashboard-sidebar-footer';
import GridsList from '@/app/(root)/dashboard/_components/grids-list';
import Brand from '@/components/brand';
import Loader from '@/components/ui/loader';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { Suspense } from 'react';

const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Brand logoClassName='h-8 w-8' brandClassName='text-3xl' />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className='space-y-2'>
          <SidebarGroupLabel className='text-lg'>Grids</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Suspense fallback={<Loader />}>
                <GridsList />
              </Suspense>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<Loader />}>
          <DashboardSidebarFooter />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
