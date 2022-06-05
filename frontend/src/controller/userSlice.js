import { createSlice } from "@reduxjs/toolkit";
import {quinn} from "../utils/mockFetch";

const userSlice = createSlice({
    name: "user", 
    initialState: {
        name: quinn.name,
        orders: quinn.orders,
        stats: quinn.stats
    }
})

// ------------------ Getters ------------------- // 
export const getOrders = (state) => state.user.orders;

export default userSlice.reducer;