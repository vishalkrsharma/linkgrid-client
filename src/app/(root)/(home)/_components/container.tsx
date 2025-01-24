import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const Container = ({
  sectionClassName,
  className,
  children,
}: {
  sectionClassName?: string;
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <section
      className={cn(
        'h-screen snap-start flex justify-center items-center gap-8',
        sectionClassName,
      )}
    >
      <div
        className={cn(
          `w-full max-w-screen-2xl max-[1536px]:px-4 mx-auto flex justify-center
          items-center`,
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Container;
