import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { resolveImageUrl } from "@/utils/media";

type ImageThumbProps = {
  src?: string | null;
  alt?: string;
  className?: string;
};

export function ImageThumb({ src, alt = "", className = "image-thumb" }: ImageThumbProps) {
  const url = resolveImageUrl(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [url]);

  if (!url || failed) {
    return (
      <span className={`${className} image-thumb-empty`} aria-label="No image">
        <ImageOff size={16} />
      </span>
    );
  }

  return <img className={className} src={url} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
