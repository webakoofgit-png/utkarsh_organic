import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { LanguageProvider, TranslationLayer } from "@/lib/i18n";
import { ProductCatalogProvider } from "@/lib/catalog";
import { StoreProvider } from "@/lib/store";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { FloatingActions } from "@/components/site/FloatingActions";

import HomePage from "@/routes/index";
import ProductsPage from "@/routes/products";
import ProductDetailPage from "@/routes/product.$slug";
import CartPage from "@/routes/cart";
import CheckoutPage from "@/routes/checkout";
import LoginPage from "@/routes/login";
import RegisterPage from "@/routes/register";
import AccountPage from "@/routes/account";
import TrackOrderPage from "@/routes/track-order";
import AboutPage from "@/routes/about";
import WhyOrganicPage from "@/routes/why-organic";
import BulkOrdersPage from "@/routes/bulk-orders";
import RecipesPage from "@/routes/recipes";
import BlogPage from "@/routes/blog";
import BlogPostPage from "@/routes/blog.$slug";
import ContactPage from "@/routes/contact";
import GalleryPage from "@/routes/gallery";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}

function AdminPanelRedirect() {
  const adminUrl =
    import.meta.env["VITE_ADMIN_URL"] ||
    (["localhost", "127.0.0.1"].includes(window.location.hostname)
      ? `${window.location.protocol}//${window.location.hostname}:5176/`
      : "");

  useEffect(() => {
    if (adminUrl) window.location.replace(adminUrl);
  }, [adminUrl]);

  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-3xl font-extrabold text-primary">Admin Panel</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        {adminUrl
          ? "Opening the admin panel..."
          : "The admin panel runs as a separate app. Set VITE_ADMIN_URL to enable this shortcut."}
      </p>
      {adminUrl ? (
        <a
          href={adminUrl}
          className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
        >
          Open Admin Panel
        </a>
      ) : null}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <TranslationLayer />
        <ScrollToTop />
        <ProductCatalogProvider>
          <StoreProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <CartDrawer />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ProductsPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/track-order" element={<TrackOrderPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/why-organic" element={<WhyOrganicPage />} />
                  <Route path="/bulk-orders" element={<BulkOrdersPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/recipes" element={<RecipesPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/admin" element={<AdminPanelRedirect />} />
                  <Route path="/admin/panel" element={<AdminPanelRedirect />} />
                  <Route path="/admin/*" element={<AdminPanelRedirect />} />
                  <Route
                    path="*"
                    element={
                      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
                        <h1 className="font-display text-6xl font-extrabold text-primary">404</h1>
                        <h2 className="mt-2 text-xl font-bold font-display">Page Not Found</h2>
                        <p className="mt-2 text-sm text-muted-foreground">The page you are looking for does not exist.</p>
                      </div>
                    }
                  />
                </Routes>
              </div>
              <Footer />
              <FloatingActions />
              <Toaster position="top-right" richColors />
            </div>
          </StoreProvider>
        </ProductCatalogProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}
