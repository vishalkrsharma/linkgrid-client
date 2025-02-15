import { getGrids } from '@/actions/grid.action';
import GridListItem from '@/app/(root)/dashboard/_components/grid-list-item';
import ErrorMessage from '@/components/error-message';

const GridsList = async () => {
  const grids = await getGrids();

  if (!grids?.success) return <ErrorMessage>{grids?.message}</ErrorMessage>;

  return (
    <>
      {grids?.data?.map((grid) => {
        return <GridListItem grid={grid} key={grid._id} />;
      })}
    </>
  );
};

export default GridsList;
