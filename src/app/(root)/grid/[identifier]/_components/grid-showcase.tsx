import { getGridByIdentifier } from '@/actions/grid.action';
import ErrorMessage from '@/components/error-message';
import Link from 'next/link';

const GridShowcase = async ({ identifier }: { identifier: string }) => {
  const grid = await getGridByIdentifier({ identifier });

  if (!grid?.success) return <ErrorMessage>{grid?.message}</ErrorMessage>;

  console.dir(grid, {
    depth: null,
  });

  return (
    <div>
      {grid?.data?.links.map((link, index) => (
        <Link href={link.url} target='_blank' key={index}>
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default GridShowcase;
