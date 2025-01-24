'use client';

import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/data/nav-links.data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <section className='space-x-4'>
      {NAV_LINKS.map(({ href, title }) => (
        <Link href={href} key={href}>
          <Button
            variant='link'
            className={cn(
              'text-base text-foreground',
              pathname.startsWith(href) && 'text-primary',
            )}
          >
            {title}
          </Button>
        </Link>
      ))}
    </section>
  );
};

export default NavLinks;
