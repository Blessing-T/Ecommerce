"use client";

import { useEffect } from "react";

import CartDrawer from "@/domains/store/shared/components/cart/CartDrawer";
import ProductGrid from "@/domains/store/shared/components/products/ProductGrid";
import { TProductPageInfo } from "@/shared/types/product";
import { useAppDispatch } from "@/store/hooks";
import { closeCart } from "@/store/slices/cartSlice";

interface StoreLayoutProps {
  products: TProductPageInfo[];
}

export const StoreLayout = ({ products }: StoreLayoutProps) => {
  const dispatch = useAppDispatch();

  // Close cart when navigating between pages
  useEffect(() => {
    const handleRouteChange = () => {
      dispatch(closeCart());
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-gray-600">
            Browse through our collection of high-quality products
          </p>
        </div>
        <ProductGrid products={products} />
      </main>
      <CartDrawer />
    </div>
  );
};

export default StoreLayout;