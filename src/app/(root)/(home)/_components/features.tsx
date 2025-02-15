import Container from './container';

const Features = () => {
  return (
    <Container sectionClassName='bg-[#1D2B53]'>
      <div className='flex-1'></div>
      <header className='text-[#FFD65A] flex-1 space-y-8'>
        <h1 className='text-5xl font-bold font-lora w-1/2'>
          Why Choose LinkGrid?
        </h1>
        <ul className='ml-4 list-disc space-y-2 w-1/2'>
          <li>
            <span className='font-semibold'>Customizable Themes</span> Make your
            link grid truly yours with a variety of themes and colors to match
            your brand.
          </li>
          <li>
            <span className='font-semibold'>Analytics & Insights</span> Track
            clicks, engagement, and discover what&#39;s working best for your
            audience.
          </li>
          <li>
            <span className='font-semibold'>Easy Integration</span> Connect all
            your platforms effortlessly. From social media to blogs and stores,
            LinkGrid supports it all.
          </li>
        </ul>
      </header>
    </Container>
  );
};

export default Features;
