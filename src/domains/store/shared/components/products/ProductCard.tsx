"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { TProductPageInfo } from "@/shared/types/product";
import { formatPrice } from "@/shared/utils/formatting";
import { cn } from "@/shared/utils/styling";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/newCartSlice";

interface ProductCardProps {
  product: TProductPageInfo;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = async () => {
    if (!product.isAvailable) return;
    
    setIsLoading(true);
    try {
      dispatch(addToCart(product));
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <Image
            src={product.images[0] || "/images/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium px-4 py-2 bg-black/60 rounded-md">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-lg font-medium text-gray-900">
              {formatPrice(product.salePrice || product.price)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        disabled={!product.isAvailable || isLoading}
        className={cn(
          "absolute bottom-4 right-4 p-2 rounded-full",
          "bg-red-600 text-white shadow-sm",
          "hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
          "disabled:bg-gray-300 disabled:cursor-not-allowed",
          "transition-all duration-200 transform",
          isLoading && "animate-pulse"
        )}
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductCard;