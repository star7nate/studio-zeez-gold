import type { ImgHTMLAttributes } from "react";

/**
 * Image with srcset + format negotiation from vite-imagetools `?picture` imports.
 * Use for any non-trivial bitmap. Falls back to a plain <img> when given a string.
 */
type PictureSource = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  picture?: PictureSource;
  src?: string;
  sizes?: string;
  priority?: boolean;
};

export function SmartImage({
  picture,
  src,
  sizes = "100vw",
  priority = false,
  alt = "",
  className,
  style,
  ...rest
}: Props) {
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";

  if (!picture) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        // @ts-expect-error React supports fetchpriority as lowercase prop
        fetchpriority={fetchPriority}
        className={className}
        style={style}
        {...rest}
      />
    );
  }

  const { sources, img } = picture;
  return (
    <picture>
      {sources.avif && <source type="image/avif" srcSet={sources.avif} sizes={sizes} />}
      {sources.webp && <source type="image/webp" srcSet={sources.webp} sizes={sizes} />}
      <img
        src={img.src}
        width={img.w}
        height={img.h}
        alt={alt}
        loading={loading}
        decoding="async"
        // @ts-expect-error fetchpriority lowercase
        fetchpriority={fetchPriority}
        sizes={sizes}
        className={className}
        style={style}
        {...rest}
      />
    </picture>
  );
}