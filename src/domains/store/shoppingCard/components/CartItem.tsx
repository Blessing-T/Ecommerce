"use client";

import Image from "next/image";

import { useAppDispatch } from "@/store/hooks";
import { CartItem as CartItemType } from "@/store/slices/cartSlice";
import { removeFromCart } from "@/store/slices/cartSlice";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center py-4 px-6 bg-white rounded-lg shadow-sm mb-4">
      <div className="relative h-20 w-20 mr-4">
        <Image
          src={item.product.images?.[0] || '/images/placeholder.png'}
          alt={item.product.name || 'Product Image'}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
        <div className="text-xs text-gray-500 mb-1">Quantity: {item.quantity}</div>
        <p className="text-gray-600">
          {item.product.salePrice ? (
            <>
              <span className="line-through text-sm mr-2">
                €{(item.product.price || 0).toFixed(2)}
              </span>
              <span className="text-red-600">€{(item.product.salePrice || 0).toFixed(2)}</span>
            </>
          ) : (
            <span>€{(item.product.price || 0).toFixed(2)}</span>
          )}
        </p>
      </div>
      <button
        onClick={() => dispatch(removeFromCart(item.product.id))}
        title="Remove all from cart"
        className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};