import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock, PackageCheck, Search, Truck, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const { orders } = useStore();
  const orderIdParam = searchParams.get("orderId") || "";

  const [inputOrderId, setInputOrderId] = useState(orderIdParam);
  const [activeOrder, setActiveOrder] = useState<any>(
    orders.find((o) => o.id === orderIdParam) || (orders.length > 0 ? orders[0] : null)
  );

  useEffect(() => {
    if (orderIdParam) {
      setInputOrderId(orderIdParam);
      const found = orders.find((o) => o.id === orderIdParam);
      if (found) setActiveOrder(found);
    }
  }, [orderIdParam, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find((o) => o.id.toLowerCase() === inputOrderId.trim().toLowerCase());
    if (found) {
      setActiveOrder(found);
      toast.success(`Found order #${found.id}`);
    } else if (inputOrderId.trim()) {
      setActiveOrder({
        id: inputOrderId.toUpperCase(),
        date: "Today",
        status: "In Transit",
        total: 448,
        items: [{ name: "Organic Onion Powder", weight: "250g", qty: 2, price: 448 }],
        address: "Nashik, Maharashtra",
      });
      toast.info(`Displaying tracking details for order #${inputOrderId.toUpperCase()}`);
    }
  };

  const steps = [
    { title: "Order Placed", date: "18 Aug, 10:30 AM", done: true, icon: CheckCircle2 },
    { title: "Quality Check & Packed", date: "18 Aug, 02:15 PM", done: true, icon: PackageCheck },
    { title: "Handed to Courier", date: "18 Aug, 05:40 PM", done: true, icon: Truck },
    { title: "Out for Delivery", date: "Estimated 19 Aug", done: false, icon: Clock },
    { title: "Delivered", date: "Estimated 19 Aug", done: false, icon: MapPin },
  ];

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">Real-Time Logistics</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">Track Your Order</h1>
          <p className="mt-3 text-muted-foreground">Enter your Order ID or phone number to see live status updates</p>
        </div>

        <form onSubmit={handleSearch} className="mt-8 flex gap-3 max-w-md mx-auto">
          <div className="flex-1 flex items-center rounded-full border border-border bg-background px-4 py-3 shadow-soft focus-within:border-accent">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="e.g. UO-982145"
              value={inputOrderId}
              onChange={(e) => setInputOrderId(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <button type="submit" className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground hover:bg-forest">
            Track
          </button>
        </form>

        {activeOrder && (
          <div className="mt-12 rounded-3xl border border-border bg-background p-8 shadow-soft">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-border pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-accent">Tracking Order</span>
                <h2 className="font-display text-2xl font-extrabold mt-1">#{activeOrder.id}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Destination: {activeOrder.address}</p>
              </div>

              <div className="rounded-2xl bg-cream px-5 py-3 text-right">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Estimated Delivery</p>
                <p className="font-display font-extrabold text-primary text-base">Tomorrow by 6:00 PM</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="mt-10 space-y-8 relative before:absolute before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-border">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative flex items-start gap-6 pl-2">
                    <div
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition z-10 ${
                        step.done ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground border border-border"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className={`font-display text-base font-bold ${step.done ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Items summary */}
            <div className="mt-10 rounded-2xl bg-cream p-5">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-muted-foreground">Parcel Contents</h4>
              <div className="mt-3 space-y-2 text-sm">
                {activeOrder.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between font-medium">
                    <span>{item.qty}x {item.name} ({item.weight})</span>
                    <span>Installed &amp; Sealed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
