"use client";

import { ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import Button from "@/shared/components/UI/button";
import { formatPrice } from "@/shared/utils/formatting";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  closeCart,
  removeFromCart,
  selectCartIsOpen,
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
  updateQuantity,
} from "@/store/slices/cartSlice";

const CartDrawer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectCartIsOpen);
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemsCount);
  const total = useAppSelector(selectCartTotal);
  
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        dispatch(closeCart());
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when cart is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-xl flex flex-col"
        style={{ animation: "slideIn 0.3s ease-out" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium">Shopping Cart</span>
            <span className="text-sm text-gray-500">({itemCount} items)</span>
          </div>
          <button
            onClick={() => dispatch(closeCart())}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag className="w-12 h-12 mb-4" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4 px-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-start space-x-4 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={item.product.images[0] || "/images/placeholder.png"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1">
                    <Link 
                      href={`/product/${item.product.id}`}
                      className="text-sm font-medium line-clamp-2 hover:text-red-600"
                    >
                      {item.product.name}
                    </Link>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-sm font-medium">
                        {formatPrice(item.product.salePrice || item.product.price)}
                      </span>
                      {item.product.salePrice && (
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(item.product.price)}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <button
                        onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity - 1 }))}
                        className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity + 1 }))}
                        className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.product.id))}
                        className="ml-auto text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button 
              onClick={() => {
                dispatch(closeCart());
                router.push("/checkout");
              }}
              className="w-full bg-red-600 text-white hover:bg-red-700 py-2 rounded-lg font-medium transition-colors"
            >
              Proceed to Checkout
            </Button>
            <Button
              onClick={() => dispatch(closeCart())}
              className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;