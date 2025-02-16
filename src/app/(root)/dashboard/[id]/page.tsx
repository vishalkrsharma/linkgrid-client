import GridContainer from '@/app/(root)/dashboard/[id]/_components/grid-container';

const GridPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <main className='w-screen flex justify-start item-center gap-4 p-8'>
      <GridContainer id={id} />
    </main>
  );
};

export default GridPage;
