import { createSlice } from "@reduxjs/toolkit";
import { quinn, gavin } from "../utils/mockFetch";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: quinn.name,
    orders: quinn.orders,
    orderDetail: quinn.orders_detail,
    stats: quinn.stats,
    recentAwaitingActions: quinn.recentAwaitingActions,
    topProducts: quinn.topProducts,
    products: gavin.products,
    profile: {
      firstName: quinn.firstName,
      lastName: quinn.lastName,
      address: quinn.address,
      email: quinn.email,
      phone: quinn.phone,
    },
  },
});

// ------------------ Getters ------------------- //
export const getOrders = (state) => state.user.orders;
export const getOrderDetails = (state) => state.user.orderDetail;
export const getStats = (state) => state.user.stats;
export const getRecentAwaitingActions = (state) =>
  state.user.recentAwaitingActions;
export const getTopProducts = (state) => state.user.topProducts;
export const getProducts = (state) => state.user.products;

export const getProfile = (state) => state.user.profile;

export default userSlice.reducer;
