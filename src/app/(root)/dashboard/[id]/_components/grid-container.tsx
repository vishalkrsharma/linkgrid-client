import { getGridById } from '@/actions/grid.action';
import GridForm from '@/app/(root)/dashboard/[id]/_components/grid-form';
import ErrorMessage from '@/components/error-message';

const GridContainer = async ({ id }: { id: string }) => {
  const grid = await getGridById({ id });

  if (!grid?.success) return <ErrorMessage>{grid?.message}</ErrorMessage>;

  return (
    <div className='w-1/2'>
      <GridForm grid={grid?.data} />
    </div>
  );
};

export default GridContainer;
