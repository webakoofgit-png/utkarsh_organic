import { ChangeEvent, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/services/api";
import { ImageThumb } from "@/components/ImageThumb";

type ImageUploadFieldProps = {
  value?: string | string[] | null;
  multiple?: boolean;
  disabled?: boolean;
  emptyText?: string;
  onChange: (value: string | string[]) => void;
};

function imageList(value: ImageUploadFieldProps["value"]) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (!value) return [];
  return String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function uploadedUrls(payload: any) {
  const rows = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
  return rows.map((item) => String(item?.url || "").trim()).filter(Boolean);
}

export function ImageUploadField({ value, multiple = false, disabled = false, emptyText, onChange }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const urls = imageList(value);

  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (!files.length) return;

    setUploading(true);
    try {
      const uploaded = await adminApi.uploadMedia(files);
      const nextUrls = uploadedUrls(uploaded);
      const firstUrl = nextUrls[0];
      if (!firstUrl) throw new Error("Upload completed, but no image URL was returned");

      onChange(multiple ? [...urls, ...nextUrls] : firstUrl);
      toast.success(`${nextUrls.length} image${nextUrls.length === 1 ? "" : "s"} uploaded`);
    } catch (error: any) {
      toast.error(error.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeAt = (index: number) => {
    const nextUrls = urls.filter((_url, currentIndex) => currentIndex !== index);
    onChange(multiple ? nextUrls : "");
  };

  return (
    <div className="image-uploader">
      <div className="image-uploader-actions">
        <label className={`btn ghost upload-trigger ${disabled || uploading ? "is-disabled" : ""}`}>
          {uploading ? <Loader2 size={16} className="spin" /> : <ImagePlus size={16} />}
          {uploading ? "Uploading..." : multiple ? "Upload Images" : "Upload Image"}
          <input type="file" accept="image/*" multiple={multiple} disabled={disabled || uploading} onChange={handleFiles} />
        </label>
      </div>

      {urls.length ? (
        <div className={`image-upload-grid ${multiple ? "" : "single"}`}>
          {urls.map((url, index) => (
            <div className="image-upload-preview" key={`${url}-${index}`}>
              <ImageThumb src={url} alt={`Uploaded image ${index + 1}`} className="image-upload-thumb" />
              <button type="button" className="btn ghost icon-only image-upload-remove" onClick={() => removeAt(index)} aria-label="Remove image">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="image-upload-empty">
          <ImagePlus size={20} />
          <span>{emptyText || "No image uploaded yet."}</span>
        </div>
      )}
    </div>
  );
}
