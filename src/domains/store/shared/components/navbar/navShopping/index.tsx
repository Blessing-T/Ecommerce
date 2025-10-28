"use client";

import { useState } from "react";

import { ShoppingCart } from "@/domains/store/shoppingCard/components/ShoppingCart";
import { ShoppingIconOutline } from "@/shared/components/icons/svgIcons";
import { cn } from "@/shared/utils/styling";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

const NavBarShopping = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartItems = useAppSelector((state: RootState) => state.cart.items || []);
  const cartItemQuantity = cartItems.length;

  const handleCartVisibility = (visibility: boolean) => {
    setIsCartVisible(visibility);
    if (visibility) {
      document.documentElement.classList.add("noScroll");
    } else {
      document.documentElement.classList.remove("noScroll");
    }
  };

  return (
    <div className="flex items-center relative ml-9 mr-4 hover:stroke-gray-700 stroke-gray-500 cursor-pointer">
      <div onClick={() => handleCartVisibility(true)} className="border-none relative">
        <ShoppingIconOutline width={24} className="fill-none stroke-inherit transition-all duration-300" />
        <span
          className={cn(
            "absolute -top-2 -right-4 text-sm size-6 leading-6 text-center rounded-full transition-all duration-300",
            cartItemQuantity ? "text-white bg-red-500 animate-bounce" : "text-gray-500 bg-gray-300"
          )}
        >
          {cartItemQuantity}
        </span>
      </div>
      <ShoppingCart
        isVisible={isCartVisible}
        handleOnClose={() => handleCartVisibility(false)}
      />
    </div>
  );
};

export default NavBarShopping;
