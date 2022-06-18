import { createSlice } from "@reduxjs/toolkit";
import { quinn, gavin } from "../utils/mockFetch";

const userSlice = createSlice({
  name: "seller",
  initialState: {
    firstName: quinn.firstName,
    lastName: quinn.lastName,
    address: quinn.address,
    email: quinn.email,
    phone: quinn.phone,
    compangName: quinn.compangName,
  },
});

// ------------------ Getters ------------------- //
// export const getOrders = (state) => state.user.orders;
// export const getOrderDetails = (state) => state.user.orderDetail;
// export const getStats = (state) => state.user.stats;
// export const getRecentAwaitingActions = (state) =>
//   state.user.recentAwaitingActions;
// export const getTopProducts = (state) => state.user.topProducts;
// export const getProducts = (state) => state.user.products;

// export const getProfile = (state) => state.user.profile;
export const getFirstName = (state) => state.seller.firstName;
export const getLastName = (state) => state.seller.lastName;
export const getAddress = (state) => state.seller.address;
export const getEmail = (state) => state.seller.email;
export const getPhone = (state) => state.seller.phone;
export const getCompanyName = (state) => state.seller.compangName;
export default userSlice.reducer;
