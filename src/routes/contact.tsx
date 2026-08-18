import { Clock, Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";

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
    toast.success("Message sent! Our customer care team will respond shortly.");
  };

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">We're Here to Help</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Get in Touch</h1>
          <p className="mt-3 text-muted-foreground">
            Have questions about your order, product recommendations, or corporate inquiries? Reach out to us anytime.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="rounded-3xl border border-border bg-forest p-8 text-forest-foreground">
              <h3 className="font-display text-2xl font-extrabold">Utkarsh Organic Headquarters</h3>
              <p className="mt-2 text-xs text-forest-foreground/75">Registered Unit &amp; Processing Facility</p>

              <div className="mt-8 space-y-5 text-sm">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Factory &amp; Registered Office</p>
                    <p className="text-xs text-forest-foreground/80 mt-1">
                      Plot 14, Food Park Road, MIDC Dindori, Nashik, Maharashtra 422003, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Phone Support</p>
                    <p className="text-xs text-forest-foreground/80 mt-1">+91 98765 43210 (Mon-Sat, 9 AM - 7 PM)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Email</p>
                    <p className="text-xs text-forest-foreground/80 mt-1">hello@utkarshorganic.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MessageCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">WhatsApp Direct</p>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline mt-1 block font-semibold">
                      Chat with us on WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="rounded-3xl border border-border bg-cream p-7">
              <div className="flex items-center gap-2 font-display text-base font-bold">
                <Clock className="h-4 w-4 text-accent" /> Operating Hours
              </div>
              <div className="mt-4 space-y-2 text-xs text-muted-foreground divide-y divide-border">
                <div className="flex justify-between pt-1">
                  <span>Monday - Saturday</span>
                  <span className="font-bold text-foreground">9:00 AM - 7:00 PM IST</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Sunday</span>
                  <span className="font-semibold text-accent">Closed (Online Orders 24/7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-border bg-background p-8 shadow-soft">
            <h3 className="font-display text-2xl font-extrabold">Send Us a Message</h3>
            <p className="mt-1 text-xs text-muted-foreground">Fill in the form below and we will reply within 24 hours.</p>

            {submitted ? (
              <div className="mt-8 py-12 text-center rounded-2xl bg-cream border border-border">
                <Send className="mx-auto h-12 w-12 text-accent" />
                <h4 className="mt-4 font-display text-xl font-bold">Thank You!</h4>
                <p className="mt-2 text-xs text-muted-foreground">We have received your message and will get back to you shortly.</p>
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
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent"
                  >
                    <option>General Inquiry</option>
                    <option>Order Status &amp; Tracking</option>
                    <option>Bulk &amp; B2B Pricing</option>
                    <option>Feedback &amp; Suggestions</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm outline-none focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-bold text-primary-foreground hover:bg-forest transition"
                >
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
