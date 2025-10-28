import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TProductPageInfo } from "@/shared/types/product";

interface WishlistState {
  items: TProductPageInfo[];
}

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<TProductPageInfo>) => {
      const item = state.items.find((item: TProductPageInfo) => item.id === action.payload.id);
      if (!item) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item: TProductPageInfo) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;