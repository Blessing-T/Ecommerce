"use client";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

import { CartItem } from "./CartItem";

interface ShoppingCartProps {
  isVisible?: boolean;
  handleOnClose?: () => void;
}

export const ShoppingCart = ({ isVisible, handleOnClose }: ShoppingCartProps) => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items || []);
  const total = cartItems.reduce((acc, item) => {
    const unitPrice = (item.product?.salePrice ?? item.product?.price ?? 0);
    return acc + unitPrice * (item.quantity ?? 0);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Your shopping cart is empty
      </div>
    );
  }

  if (!isVisible) {
    // Remove noScroll class when cart is not visible
    document.documentElement.classList.remove("noScroll");
    return null;
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg z-50 overflow-y-auto">
      <div className="sticky top-0 flex justify-between items-center p-4 bg-white border-b">
        <h2 className="text-xl font-medium">Shopping Cart</h2>
        <button
          onClick={() => {
            document.documentElement.classList.remove("noScroll");
            handleOnClose?.();
          }}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <div className="mb-6">
          {cartItems.map((item, idx) => (
            <CartItem key={item.product?.id ?? (item as any).productId ?? idx} item={item} />
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total:</span>
            <span className="text-xl font-medium">€{total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
