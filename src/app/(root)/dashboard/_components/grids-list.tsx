import { getGrids } from '@/actions/grid.action';
import ErrorMessage from '@/components/error-message';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';

const GridsList = async () => {
  const grids = await getGrids();

  if (!grids?.success) return <ErrorMessage>{grids?.message}</ErrorMessage>;

  return (
    <>
      {grids.data.map((grid) => {
        return (
          <SidebarMenuItem key={grid._id}>
            <SidebarMenuButton asChild>
              <Link href={'/dashboard/' + grid.identifier}>
                {grid.identifier}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
};

export default GridsList;
