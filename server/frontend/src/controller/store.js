import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import buyerSlice from "./buyerSlice";
import sellerSlice from "./sellerSlice";
import loginSlice from "./login/reducer";

export default configureStore({
  reducer: {
    buyer: buyerSlice,
    seller: sellerSlice,
    cart: cartSlice,
    products: productSlice,
    login: loginSlice,
  },
  middleware: (middleware) =>
    middleware({
      serializableCheck: {
        ignoreState: true,
      },
    }),
});
