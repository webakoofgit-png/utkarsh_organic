import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CATEGORIES, PRODUCTS, type Category, type Product } from "@/lib/products";
import { storeApi } from "@/lib/api";

type StoreCategory = { id: string; name: string; blurb?: string };

type CatalogContextValue = {
  products: Product[];
  categories: StoreCategory[];
  loading: boolean;
  source: "api" | "static";
  getProductBySlug: (slug: string) => Product | undefined;
  categoryLabel: (category: string) => string;
  refresh: () => Promise<void>;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

function normalizeProduct(raw: any): Product {
  return {
    slug: raw.slug,
    name: raw.name,
    short: raw.short || raw.shortDescription || "",
    image: raw.image || raw.mainImage || "",
    category: (raw.category || raw.categorySlug || "dehydrated-powders") as Category,
    basePrice: Number(raw.basePrice || raw.salePrice || raw.regularPrice || 0),
    baseMrp: Number(raw.baseMrp || raw.regularPrice || raw.salePrice || 0),
    priceLabel: raw.priceLabel || `Rs. ${Number(raw.salePrice || raw.regularPrice || 0).toLocaleString("en-IN")} / kg`,
    moq: raw.moq || raw.minimumOrderQuantity || "100 Kilogram (MOQ)",
    rating: Number(raw.rating || 4.8),
    reviews: Number(raw.reviews || raw.reviewCount || 0),
    bestSeller: Boolean(raw.bestSeller || raw.isBestSeller),
    newArrival: Boolean(raw.newArrival || raw.isNewArrival),
    inStock: raw.inStock !== false,
    sku: raw.sku,
    sourceUrl: raw.sourceUrl || "",
    highlights: raw.highlights || [],
    description: raw.description || raw.fullDescription || raw.short || "",
    benefits: raw.benefits || [],
    ingredients: raw.ingredients || "",
    usage: raw.usage || raw.usageInstructions || [],
    specs: raw.specs || [],
    storage: raw.storage || raw.storageInstructions || "",
    gallery: raw.gallery || [],
  };
}

export function ProductCatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<StoreCategory[]>(CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "static">("static");

  const refresh = async () => {
    setLoading(true);
    try {
      const [productRes, categoryRes] = await Promise.all([storeApi.products({ limit: 200 }), storeApi.categories()]);
      if (Array.isArray(productRes.data) && productRes.data.length) {
        setProducts(productRes.data.map(normalizeProduct));
        setSource("api");
      }
      if (Array.isArray(categoryRes.data) && categoryRes.data.length) {
        setCategories(categoryRes.data.map((item: any) => ({ id: item.slug || item.id, name: item.name, blurb: item.description || item.blurb })));
      }
    } catch {
      setProducts(PRODUCTS);
      setCategories(CATEGORIES);
      setSource("static");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo<CatalogContextValue>(() => {
    const categoryLabel = (category: string) => categories.find((item) => item.id === category)?.name || category;
    return {
      products,
      categories,
      loading,
      source,
      categoryLabel,
      getProductBySlug: (slug) => products.find((product) => product.slug === slug),
      refresh,
    };
  }, [products, categories, loading, source]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used inside ProductCatalogProvider");
  return ctx;
}
