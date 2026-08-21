import { FormEvent, useEffect, useRef, useState } from "react";
import { Copy, ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/services/api";
import { formatDate } from "@/utils/format";

export function MediaPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminApi.list("media", { limit: 60 });
      setRows(res.data || []);
    } catch (error: any) {
      toast.error(error.message || "Media failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (event: FormEvent) => {
    event.preventDefault();
    const files = fileRef.current?.files;
    if (!files?.length) return toast.info("Choose image files first");
    try {
      await adminApi.upload(files);
      if (fileRef.current) fileRef.current.value = "";
      toast.success("Media uploaded");
      load();
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    }
  };

  const remove = async (row: any) => {
    if (!confirm(`Delete ${row.originalName || row.filename}?`)) return;
    try {
      await adminApi.remove("media", row.id);
      toast.success("Media deleted");
      load();
    } catch (error: any) {
      toast.error(error.message || "Delete failed");
    }
  };

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Media</p>
          <h1>Media Library</h1>
          <p className="muted" style={{ marginTop: 8 }}>Upload, browse, copy URLs, and delete unused product or content images.</p>
        </div>
        <button className="btn ghost" onClick={load}><RefreshCw size={17} /> Refresh</button>
      </div>

      <section className="panel">
        <form className="toolbar" onSubmit={upload}>
          <div className="toolbar-group">
            <input className="input" type="file" accept="image/*" multiple ref={fileRef} />
            <button className="btn"><ImagePlus size={17} /> Upload</button>
          </div>
        </form>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Preview</th>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="empty">Loading media...</td></tr>
              ) : rows.length ? (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td><img className="image-thumb" src={row.url} alt="" /></td>
                    <td>{row.originalName || row.filename}</td>
                    <td>{row.mimeType}</td>
                    <td>{Math.round((row.size || 0) / 1024)} KB</td>
                    <td>{formatDate(row.createdAt)}</td>
                    <td>
                      <div className="row-actions">
                        <button className="btn ghost icon-only" onClick={() => { navigator.clipboard.writeText(row.url); toast.success("URL copied"); }}><Copy size={16} /></button>
                        <button className="btn ghost icon-only" onClick={() => remove(row)}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="empty">No media uploaded yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
