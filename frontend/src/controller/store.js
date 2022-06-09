import {configureStore} from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        cart: CartSlice,
        products: productSlice
    }
})