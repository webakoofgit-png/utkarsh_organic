import farm from "@/assets/farm.jpg";
import farmFreshNaturalOrganic from "@/assets/farm-gallery-fresh-natural-organic.png";
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
  frameClass?: string;
  fit?: "cover" | "contain";
  featured?: boolean;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "Satara Farm Story",
    label: "Farm",
    image: farmFreshNaturalOrganic,
    description: "A calm view of the farm-first Utkarsh Organic story from Maharashtra.",
    frameClass: "aspect-[3/2]",
    fit: "cover",
    featured: true,
  },
  {
    title: "Dehydrated Onion Ingredients",
    label: "Ingredients",
    image: heroOnion,
    description: "Onion based dehydrated ingredients prepared for consistent kitchen use.",
    frameClass: "aspect-[4/3]",
    fit: "cover",
  },
  {
    title: "Product Flatlay",
    label: "Pantry",
    image: flatlay,
    description: "A clean pantry view of powders, flakes and everyday cooking formats.",
    frameClass: "aspect-[14/9]",
    fit: "cover",
  },
  {
    title: "Red Onion Powder",
    label: "Best Seller",
    image: redOnionPowder,
    description: "Full bowl product photo for the dehydrated red onion powder listing.",
    frameClass: "aspect-square",
    fit: "contain",
  },
  {
    title: "Beetroot Powder",
    label: "Organic Powder",
    image: beetroot,
    description: "Bright natural powder format for color, nutrition and food applications.",
    frameClass: "aspect-square",
    fit: "cover",
  },
  {
    title: "Carrot Powder",
    label: "Vegetable Powder",
    image: carrot,
    description: "Shelf-stable carrot powder for commercial kitchens and processors.",
    frameClass: "aspect-square",
    fit: "cover",
  },
  {
    title: "Bulk Order Ready",
    label: "B2B",
    image: heroBulkOrders,
    description: "MOQ and bulk-ready formats for HoReCa and food manufacturing buyers.",
    frameClass: "aspect-[16/9]",
    fit: "cover",
  },
  {
    title: "Quality Promise",
    label: "Trust",
    image: heroWhyOrganic,
    description: "Simple ingredients, careful sourcing and clear product specifications.",
    frameClass: "aspect-[16/9]",
    fit: "cover",
  },
  {
    title: "Contact The Farm",
    label: "Visit",
    image: heroContact,
    description: "Reach the Utkarsh Organic Farm team for orders, samples and farm visits.",
    frameClass: "aspect-[16/9]",
    fit: "cover",
  },
];
