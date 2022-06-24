import { createSlice } from "@reduxjs/toolkit";
import { quinn, gavin } from "../utils/mockFetch";
import { mockBuyer } from "../utils/mockBuyer";

const INITIAL_STATE = {
  firstName: quinn.firstName,
  lastName: quinn.lastName,
  address: quinn.address,
  email: quinn.email,
  phone: quinn.phone,
  cart: quinn.cart,
  pwd: null,
  error: null,
};

const userSlice = createSlice({
  name: "buyer",
  initialState: INITIAL_STATE,
});

// ------------------ Getters ------------------- //
// export const getOrders = (state) => state.user.orders;
// export const getOrderDetails = (state) => state.user.orderDetail;
// export const getStats = (state) => state.user.stats;
// export const getRecentAwaitingActions = (state) =>
// state.user.recentAwaitingActions;
// export const getTopProducts = (state) => state.user.topProducts;
// export const getProducts = (state) => state.user.products;

export const getFirstName = (state) => state.buyer.firstName;
export const getLastName = (state) => state.buyer.lastName;
export const getAddress = (state) => state.buyer.address;
export const getEmail = (state) => state.buyer.email;
export const getPhone = (state) => state.buyer.phone;
export const getCart = (state) => state.buyer.cart;
export const getOrderHistory = (state) => state.buyer.orderHistory;

export default userSlice.reducer;
