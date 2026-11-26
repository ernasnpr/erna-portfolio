import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Visual Preview',
  fallbackSubtitle = 'Replaceable image slot',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#E8F0EC] text-[#164232] p-6 text-center ${className}`}
      >
        <ImageOff className="w-6 h-6 mb-2 opacity-70" aria-hidden="true" />
        <p className="font-editorial text-base font-medium">{fallbackTitle}</p>
        <p className="text-xs text-[#575D59] mt-1">{fallbackSubtitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
