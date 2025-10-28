import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

export interface RootState {
  cart: ReturnType<typeof cartReducer>;
  wishlist: ReturnType<typeof wishlistReducer>;
}

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "wishlist"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;