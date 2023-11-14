import Link from 'next/link';
import Image from 'next/image';

const Logo = ({
  src,
  children,
  size,
}: {
  src: string | null;
  children?: React.ReactNode;
  size?: number
}) => (
  <Link
    href="/"
    aria-label="Back to homepage"
    className="flex items-center p-2"
  >
    {src && <Image src={src} alt="logo" width={size || 45} height={size || 45} />}
    <div className="ml-2">{children}</div>
  </Link>
);

export default Logo;
