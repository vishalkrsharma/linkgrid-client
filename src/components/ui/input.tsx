import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, containerClassName, leftButton, rightButton, ...props },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'relative flex justify-center items-stretch',
          containerClassName,
        )}
      >
        {leftButton && (
          <div className='absolute left-2 top-1/2 transform -translate-y-1/2'>
            {leftButton}
          </div>
        )}
        <input
          type={type}
          className={cn(
            `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1
            text-base shadow-sm transition-colors file:border-0 file:bg-transparent
            file:text-sm file:font-medium file:text-foreground
            placeholder:text-muted-foreground focus-visible:outline-none
            focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed
            disabled:opacity-50 md:text-sm`,
            className,
            leftButton && 'pl-12',
            rightButton && 'pr-12',
          )}
          ref={ref}
          {...props}
        />
        {rightButton && (
          <div className='absolute right-0.5 top-1/2 transform -translate-y-1/2'>
            {rightButton}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
