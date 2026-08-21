export type CustomerTestimonial = {
  quote: string;
  name: string;
  place: string;
  status: "placeholder" | "verified";
};

export const CUSTOMER_TESTIMONIALS: CustomerTestimonial[] = [
  {
    quote: "Verified customer feedback will appear here after approval.",
    name: "Bulk buyer review",
    place: "HoReCa and food processors",
    status: "placeholder",
  },
  {
    quote: "Verified customer feedback will appear here after approval.",
    name: "Retail customer review",
    place: "Home kitchens",
    status: "placeholder",
  },
  {
    quote: "Verified customer feedback will appear here after approval.",
    name: "Distributor review",
    place: "Pan India supply",
    status: "placeholder",
  },
];
