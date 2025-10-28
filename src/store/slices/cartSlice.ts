import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TProductPageInfo } from "@/shared/types/product";

interface CartItem {
  product: TProductPageInfo;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addToCart: (state, action: PayloadAction<TProductPageInfo>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }

      state.isOpen = true; // Open cart drawer when adding item
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.product.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  toggleCart,
  openCart,
  closeCart,
  setLoading,
  setError,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartIsOpen = (state: { cart: CartState }) => state.cart.isOpen;
export const selectCartIsLoading = (state: { cart: CartState }) => state.cart.isLoading;
export const selectCartError = (state: { cart: CartState }) => state.cart.error;
export const selectCartItemsCount = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) => 
  state.cart.items.reduce(
    (total, item) => total + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

export type { CartItem, CartState };
export default cartSlice.reducer;