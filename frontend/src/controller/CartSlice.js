import { createSlice } from "@reduxjs/toolkit";
import { mockBuyer } from "../utils/mockBuyer";

const CartSlice = createSlice({
    name: "user", 
    initialState: {
        userName: mockBuyer.username,
        cart: mockBuyer.cart,
        sum: mockBuyer.sum
    }
})

// ------------------ Getters ------------------- // 
export const getCart = (state) => state.cart.cart;

export const getSum = (state) => state.cart.sum;

export default CartSlice.reducer;