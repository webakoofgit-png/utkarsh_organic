import type { ImgHTMLAttributes } from "react";
import logo from "@/assets/logo-mark.png";
import { cn } from "@/lib/utils";

type ProductImageWithLogoProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  stampClassName?: string;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "className">;
};

export function ProductImageWithLogo({
  src,
  alt,
  className,
  imageClassName,
  stampClassName,
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
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-2 right-2 grid h-12 w-12 place-items-center rounded-xl border border-green-700/15 bg-white/96 p-1 shadow-[0_8px_24px_rgba(20,83,45,0.16)]",
          stampClassName,
        )}
      >
        <img src={logo} alt="" className="h-full w-full object-contain" />
      </span>
    </span>
  );
}
