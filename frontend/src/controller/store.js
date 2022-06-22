import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import buyerSlice from "./buyerSlice";
import sellerSlice from "./sellerSlice";
import orderSlice from "./orderSlice";

export default configureStore({
  reducer: {
    buyer: buyerSlice,
    seller: sellerSlice,
    cart: cartSlice,
    products: productSlice,
    orders: orderSlice,
  },
  middleware: (middleware) =>
    middleware({
      serializableCheck: {
        ignoreState: true,
      },
    }),
});
