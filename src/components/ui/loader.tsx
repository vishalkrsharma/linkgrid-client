import { cn } from '@/lib/utils';
import { BeatLoader } from 'react-spinners';

const Loader = ({ className }: { className?: string }) => {
  return <BeatLoader className={cn('', className)} />;
};

export default Loader;
