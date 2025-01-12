import { cn } from '@/lib/utils';
import Image from 'next/image';

const Brand = ({
  className,
  logoClassName,
  brandClassName,
  showBrand = true,
}: {
  className?: string;
  logoClassName?: string;
  brandClassName?: string;
  showBrand?: boolean;
}) => {
  return (
    <div className={cn('flex justify-center items-center gap-4', className)}>
      <Image
        src='/images/logo.png'
        alt='LOGO'
        height={50}
        width={50}
        className={cn('', logoClassName)}
      />
      <div
        className={cn(
          'text-5xl font-medium font-lora',
          brandClassName,
          !showBrand && 'hidden',
        )}
      >
        LinkGrid
      </div>
    </div>
  );
};

export default Brand;
