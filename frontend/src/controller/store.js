import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
        products: productSlice
    },
    middleware: (middleware) =>
        middleware({
            serializableCheck: {
                ignoreState: true
            }
        })

})