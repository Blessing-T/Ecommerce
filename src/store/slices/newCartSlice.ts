import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TProductPageInfo } from "@/shared/types/product";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  quantity: number;
  image: string;
  isAvailable: boolean;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addToCart: (state, action: PayloadAction<TProductPageInfo>) => {
      state.isLoading = true;
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          salePrice: action.payload.salePrice,
          quantity: 1,
          image: action.payload.images[0] || "/images/placeholder.png",
          isAvailable: action.payload.isAvailable,
        });
      }
      state.isLoading = false;
      state.isOpen = true; // Auto-open cart when adding items
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        // Remove item if quantity is 0
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  openCart,
  closeCart,
  setLoading,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;
export const selectCartIsLoading = (state: { cart: CartState }) => state.cart.isLoading;
export const selectCartTotal = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => {
    const itemPrice = item.salePrice || item.price;
    return total + (itemPrice * item.quantity);
  }, 0);
export const selectCartItemsCount = (state: { cart: CartState }) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;