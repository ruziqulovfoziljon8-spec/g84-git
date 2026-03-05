import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./slices/pizzaSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    pizza: pizzaReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
