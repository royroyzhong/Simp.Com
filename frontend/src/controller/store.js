import {configureStore} from "@reduxjs/toolkit";
<<<<<<< HEAD
import CartSlice from "./CartSlice";
=======
import productSlice from "./productSlice";
>>>>>>> dev: [Quinn] added upload function
import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        user: userSlice,
<<<<<<< HEAD
        cart: CartSlice
=======
        products: productSlice
>>>>>>> dev: [Quinn] added upload function
    }
})