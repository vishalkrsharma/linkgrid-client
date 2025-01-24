import DashboardSidebar from '@/app/(root)/dashboard/_components/dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <SidebarProvider>
        <DashboardSidebar />
        {children}
      </SidebarProvider>
    </main>
  );
};

export default DashboardLayout;
