import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ProductImageWithLogoProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "className">;
};

export function ProductImageWithLogo({
  src,
  alt,
  className,
  imageClassName,
  imgProps,
}: ProductImageWithLogoProps) {
  return (
    <span className={cn("relative block min-h-0 min-w-0", className)}>
      <img
        src={src}
        alt={alt}
        className={cn("h-full w-full object-contain object-center", imageClassName)}
        {...imgProps}
      />
    </span>
  );
}
