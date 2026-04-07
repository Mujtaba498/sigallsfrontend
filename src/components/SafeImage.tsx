"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const DEFAULT_FALLBACK_SRC = "/placeholder-image.svg";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: ImageProps["src"] | null;
  fallbackSrc?: ImageProps["src"];
};

function resolveImageSrc(
  src: SafeImageProps["src"],
  fallbackSrc: ImageProps["src"]
) {
  if (typeof src === "string") {
    const trimmed = src.trim();
    return trimmed.length > 0 ? trimmed : fallbackSrc;
  }

  return src ?? fallbackSrc;
}

export default function SafeImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  alt,
  onError,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<ImageProps["src"]>(() =>
    resolveImageSrc(src, fallbackSrc)
  );

  useEffect(() => {
    setCurrentSrc(resolveImageSrc(src, fallbackSrc));
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      alt={alt}
      src={currentSrc}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }

        onError?.(event);
      }}
    />
  );
}
