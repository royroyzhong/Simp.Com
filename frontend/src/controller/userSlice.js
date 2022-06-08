import { createSlice } from "@reduxjs/toolkit";
import {quinn} from "../utils/mockFetch";

const userSlice = createSlice({
    name: "user", 
    initialState: {
        name: quinn.name,
        orders: quinn.orders,
        stats: quinn.stats,
        recentAwaitingActions: quinn.recentAwaitingActions,
        topProducts: quinn.topProducts
    }
})

// ------------------ Getters ------------------- // 
export const getOrders = (state) => state.user.orders;
export const getStats = (state) => state.user.stats;
export const getRecentAwaitingActions = (state) => state.user.recentAwaitingActions;
export const getTopProducts = (state) => state.user.topProducts;

export default userSlice.reducer;