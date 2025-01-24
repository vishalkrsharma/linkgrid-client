import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

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
    <Link
      href='/'
      className={cn('flex justify-center items-center gap-4 group', className)}
    >
      <Image
        src='/images/logo.png'
        alt='LOGO'
        height={50}
        width={50}
        className={cn('aspect-square', logoClassName)}
      />
      <div
        className={cn(
          'font-semibold font-lora group-hover:underline',
          brandClassName,
          !showBrand && 'hidden',
        )}
      >
        LinkGrid
      </div>
    </Link>
  );
};

export default Brand;
