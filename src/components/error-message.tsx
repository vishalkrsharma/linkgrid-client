import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const ErrorMessage = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex justify-center item-center h-full', className)}>
      {children}
    </div>
  );
};

export default ErrorMessage;
