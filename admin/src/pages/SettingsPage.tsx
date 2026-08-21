import { FormEvent, useEffect, useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { adminApi } from "@/services/api";

const groups = {
  business: [
    ["businessName", "Business Name"],
    ["logo", "Logo URL"],
    ["address", "Address"],
    ["phone", "Phone"],
    ["email", "Email"],
    ["gstNumber", "GST Number"],
    ["fssaiNumber", "FSSAI Number"],
  ],
  ecommerce: [
    ["gst", "GST %"],
    ["shippingCharges", "Shipping Charges"],
    ["freeShippingMinimum", "Free Shipping Minimum"],
    ["codAvailability", "COD Availability"],
    ["minimumOrderAmount", "Minimum Order Amount"],
    ["currency", "Currency"],
  ],
  social: [
    ["facebook", "Facebook"],
    ["instagram", "Instagram"],
    ["youtube", "YouTube"],
    ["whatsapp", "WhatsApp"],
  ],
};

export function SettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.settings().then(setSettings).catch((error) => toast.error(error.message || "Settings failed to load"));
  }, []);

  const setValue = (group: string, key: string, value: any) => {
    setSettings((current: any) => ({ ...current, [group]: { ...(current[group] || {}), [key]: value } }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await adminApi.settings(settings);
      toast.success("Settings saved");
    } catch (error: any) {
      toast.error(error.message || "Settings save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Site Settings</h1>
          <p className="muted" style={{ marginTop: 8 }}>Business, ecommerce, and social details used across the website.</p>
        </div>
      </div>

      <form onSubmit={submit} className="split">
        {Object.entries(groups).map(([group, fields]) => (
          <section className="panel" key={group}>
            <h2>{group[0].toUpperCase() + group.slice(1)}</h2>
            <div className="form-grid" style={{ marginTop: 16 }}>
              {fields.map(([key, label]) => (
                <div className={`field ${["address", "logo", "facebook", "instagram", "youtube"].includes(key) ? "full" : ""}`} key={key}>
                  <label>{label}</label>
                  {key === "address" ? (
                    <textarea className="textarea" value={settings[group]?.[key] || ""} onChange={(event) => setValue(group, key, event.target.value)} />
                  ) : key === "codAvailability" ? (
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                      <input type="checkbox" checked={Boolean(settings[group]?.[key])} onChange={(event) => setValue(group, key, event.target.checked)} />
                      Enabled
                    </label>
                  ) : (
                    <input className="input" value={settings[group]?.[key] || ""} onChange={(event) => setValue(group, key, event.target.value)} />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
        <div style={{ gridColumn: "1 / -1" }}>
          <button className="btn" disabled={saving}><Save size={17} /> {saving ? "Saving..." : "Save Settings"}</button>
        </div>
      </form>
    </main>
  );
}
