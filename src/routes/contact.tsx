import { Clock, Mail, MapPin, Phone, Send, MessageCircle, ShieldCheck, Award } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { COMPANY_INFO } from "@/lib/products";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Message sent! Praful Chorge & team will respond shortly.");
  };

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto">
          <p className="eyebrow">{COMPANY_INFO.marathiHeader}</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Get in Touch</h1>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            {COMPANY_INFO.marathiDescription}
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-border bg-forest p-8 text-forest-foreground shadow-lift">
              <span className="rounded-full bg-accent/20 px-3.5 py-1 text-[11px] font-bold text-accent uppercase tracking-wider">
                Direct Farm Unit
              </span>
              <h3 className="font-display text-2xl font-extrabold mt-3">{COMPANY_INFO.name}</h3>
              <p className="text-xs text-forest-foreground/80 mt-1">Contact Person: <strong className="text-accent">{COMPANY_INFO.contactPerson}</strong></p>

              <div className="mt-8 space-y-5 text-sm">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Farm &amp; Factory Address</p>
                    <p className="text-xs text-forest-foreground/80 mt-1 leading-relaxed">
                      {COMPANY_INFO.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Direct Call &amp; Support</p>
                    <p className="text-xs text-forest-foreground/80 mt-1">
                      {COMPANY_INFO.phonePrimary} / {COMPANY_INFO.phoneSecondary}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Email Addresses</p>
                    <p className="text-xs text-forest-foreground/80 mt-1">
                      {COMPANY_INFO.email} / {COMPANY_INFO.officialEmail}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MessageCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">WhatsApp Direct Order</p>
                    <a
                      href={`https://wa.me/${COMPANY_INFO.phonePrimary.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-accent hover:underline mt-1 block font-bold"
                    >
                      Click to Chat on WhatsApp ({COMPANY_INFO.phonePrimary}) &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Official Badges */}
              <div className="mt-8 pt-6 border-t border-forest-foreground/15 grid gap-2 text-xs text-forest-foreground/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                  <span><strong>FSSAI Reg. No:</strong> {COMPANY_INFO.fssaiRegNo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent shrink-0" />
                  <span><strong>GSTIN:</strong> {COMPANY_INFO.gstin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-accent shrink-0" />
                  <span><strong>Udyam Registration:</strong> {COMPANY_INFO.udyamRegNo}</span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="rounded-3xl border border-border bg-cream p-7">
              <div className="flex items-center gap-2 font-display text-base font-bold">
                <Clock className="h-4 w-4 text-accent" /> Operating &amp; Dispatch Hours
              </div>
              <div className="mt-4 space-y-2 text-xs text-muted-foreground divide-y divide-border">
                <div className="flex justify-between pt-1">
                  <span>Monday - Saturday</span>
                  <span className="font-bold text-foreground">8:00 AM - 8:00 PM IST</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Sunday</span>
                  <span className="font-semibold text-accent">Farm Visits by Appointment (Orders 24/7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-border bg-background p-8 shadow-soft">
            <h3 className="font-display text-2xl font-extrabold">Send Us a Direct Inquiry</h3>
            <p className="mt-1 text-xs text-muted-foreground">Reach Praful Chorge &amp; the Utkarsh Organic team directly.</p>

            {submitted ? (
              <div className="mt-8 py-12 text-center rounded-2xl bg-cream border border-border">
                <Send className="mx-auto h-12 w-12 text-accent" />
                <h4 className="mt-4 font-display text-xl font-bold">Dhanyawad (धन्यवाद)!</h4>
                <p className="mt-2 text-xs text-muted-foreground">We have received your message and will call/WhatsApp you back shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email / Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="ananya@example.com / +91 98765 43210"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject / Product Requirement</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent"
                  >
                    <option>General Product Inquiry</option>
                    <option>Dehydrated Vegetable Powders (Palak, Beet, Kanda, Shevga, Gajar)</option>
                    <option>Bulk &amp; Wholesale Supply (Hotels / Caterers / Cloud Kitchens)</option>
                    <option>Order Status &amp; Dispatch</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what products or powder quantities you need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-bold text-primary-foreground hover:bg-forest transition"
                >
                  <Send className="h-4 w-4" /> Send Direct Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
