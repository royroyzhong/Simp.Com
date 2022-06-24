import { createSlice } from "@reduxjs/toolkit";
import { mockBuyer } from "../utils/mockBuyer";

const cartSlice = createSlice({
    name: "user", 
    initialState: {
        userName: mockBuyer.username,
        cart: mockBuyer.cart,
    }
})

// ------------------ Getters ------------------- // 
export const getCart = (state) => state.cart.cart;

export default cartSlice.reducer;