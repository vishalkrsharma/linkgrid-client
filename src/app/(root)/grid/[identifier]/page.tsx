import GridShowcase from '@/app/(root)/grid/[identifier]/_components/grid-showcase';
import Loader from '@/components/ui/loader';
import { Suspense } from 'react';

const GridPage = async ({
  params,
}: {
  params: Promise<{ identifier: string }>;
}) => {
  const { identifier } = await params;

  return (
    <Suspense fallback={<Loader />}>
      <GridShowcase identifier={identifier} />
    </Suspense>
  );
};

export default GridPage;
