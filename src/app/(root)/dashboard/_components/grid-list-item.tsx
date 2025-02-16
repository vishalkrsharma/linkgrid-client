'use client';

import { GridListType } from '@/types/types';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const GridListItem = ({ grid }: { grid: GridListType }) => {
  const pathname = usePathname();

  return (
    <SidebarMenuItem key={grid._id}>
      <SidebarMenuButton asChild>
        <Link
          className={cn(
            '',
            pathname.includes(grid._id) && 'bg-foreground text-background',
          )}
          href={'/dashboard/' + grid._id}
        >
          {grid.identifier}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default GridListItem;
