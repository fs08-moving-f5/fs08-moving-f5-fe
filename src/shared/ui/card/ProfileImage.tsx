'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const DEFAULT_PROFILE_IMAGE_SRC = '/img/profile.png';

type ProfileImagePropsWithAlt = Omit<ImageProps, 'src' | 'alt'> & {
  src?: string | null;
  fallbackSrc?: string;
  alt: string;
};

const ProfileImage = ({ src, fallbackSrc, alt, onError, ...props }: ProfileImagePropsWithAlt) => {
  const resolvedFallbackSrc = fallbackSrc ?? DEFAULT_PROFILE_IMAGE_SRC;

  const resolvedSrc = useMemo(() => {
    if (typeof src !== 'string') return resolvedFallbackSrc;
    const trimmed = src.trim();
    return trimmed.length > 0 ? trimmed : resolvedFallbackSrc;
  }, [src, resolvedFallbackSrc]);

  const [currentSrc, setCurrentSrc] = useState<string>(resolvedSrc);

  useEffect(() => {
    setCurrentSrc(resolvedSrc);
  }, [resolvedSrc]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        if (currentSrc !== resolvedFallbackSrc) {
          setCurrentSrc(resolvedFallbackSrc);
        }
        onError?.(event);
      }}
    />
  );
};

export default ProfileImage;
