import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import buyerSlice from "./buyerSlice";
import sellerSlice from "./sellerSlice";

export default configureStore({
  reducer: {
    buyer: buyerSlice,
    seller: sellerSlice,
    cart: cartSlice,
    products: productSlice,
  },
  middleware: (middleware) =>
    middleware({
      serializableCheck: {
        ignoreState: true,
      },
    }),
});
