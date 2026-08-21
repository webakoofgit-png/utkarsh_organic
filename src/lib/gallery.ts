import farm from "@/assets/farm.jpg";
import flatlay from "@/assets/flatlay.jpg";
import heroBulkOrders from "@/assets/hero-bulk-orders.jpg";
import heroContact from "@/assets/hero-contact.jpg";
import heroOnion from "@/assets/hero-onion.jpg";
import heroWhyOrganic from "@/assets/hero-why-organic.jpg";
import beetroot from "@/assets/p-beetroot.jpg";
import carrot from "@/assets/p-carrot.jpg";
import redOnionPowder from "@/assets/product-red-onion-powder-full-bowl.png";

export type GalleryItem = {
  title: string;
  label: string;
  image: string;
  description: string;
  featured?: boolean;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "Satara Farm Story",
    label: "Farm",
    image: farm,
    description: "A calm view of the farm-first Utkarsh Organic story from Maharashtra.",
    featured: true,
  },
  {
    title: "Dehydrated Onion Ingredients",
    label: "Ingredients",
    image: heroOnion,
    description: "Onion based dehydrated ingredients prepared for consistent kitchen use.",
  },
  {
    title: "Product Flatlay",
    label: "Pantry",
    image: flatlay,
    description: "A clean pantry view of powders, flakes and everyday cooking formats.",
  },
  {
    title: "Red Onion Powder",
    label: "Best Seller",
    image: redOnionPowder,
    description: "Full bowl product photo for the dehydrated red onion powder listing.",
  },
  {
    title: "Beetroot Powder",
    label: "Organic Powder",
    image: beetroot,
    description: "Bright natural powder format for color, nutrition and food applications.",
  },
  {
    title: "Carrot Powder",
    label: "Vegetable Powder",
    image: carrot,
    description: "Shelf-stable carrot powder for commercial kitchens and processors.",
  },
  {
    title: "Bulk Order Ready",
    label: "B2B",
    image: heroBulkOrders,
    description: "MOQ and bulk-ready formats for HoReCa and food manufacturing buyers.",
  },
  {
    title: "Quality Promise",
    label: "Trust",
    image: heroWhyOrganic,
    description: "Simple ingredients, careful sourcing and clear product specifications.",
  },
  {
    title: "Contact The Farm",
    label: "Visit",
    image: heroContact,
    description: "Reach the Utkarsh Organic Farm team for orders, samples and farm visits.",
  },
];
