
interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export default function Image({ src, alt, className = '', onClick }: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={`object-cover w-full h-full rounded-md shadow-md transition-all hover:scale-110 ${className}`}
    />
  );
}
