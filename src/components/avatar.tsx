import { default as BoringAvatar } from 'boring-avatars';
import Image from 'next/image';

const Avatar = ({
  imageUrl,
  username,
  size = 40,
}: {
  imageUrl: string | null;
  username: string;
  size?: number;
}) => {
  return imageUrl ? (
    <Image src={imageUrl} alt={username} height={size} width={size} />
  ) : (
    <BoringAvatar name={username} variant='beam' size={size} />
  );
};

export default Avatar;
