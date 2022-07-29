import { createSlice } from "@reduxjs/toolkit";
import { mockBuyer } from "../utils/mockBuyer";
import { quinn } from "../utils/mockFetch";

import { REQUEST_STATE } from './utils';
import { getSellerOrderAsync, changeStatusAsync } from '../component/cart/cartThunks';

const INITIAL_STATE = {
  id: mockBuyer.id,
  buyer: mockBuyer.buyer,
  status: mockBuyer.status,
  cart: mockBuyer.cart,
  sum: mockBuyer.sum,
  orders: [],
  orderDetail:  [],
  stats: quinn.stats,
  modified: "Idle",

  getBuyerOrder: REQUEST_STATE.IDLE,
  getSellerOrder: REQUEST_STATE.IDLE,
  changeStatus: REQUEST_STATE.IDLE,
}

const orderSlice = createSlice({
  name: "orders",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
    .addCase(getSellerOrderAsync.pending, (state) => {
      state.getOrder = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(getSellerOrderAsync.fulfilled, (state, action) => {
      state.getOrder = REQUEST_STATE.FULFILLED;
      state.orderDetail = action.payload;
    })
    .addCase(getSellerOrderAsync.rejected, (state, action) => {
      state.getOrder = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
    .addCase(changeStatusAsync.pending, (state) => {
      state.changeStatus = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(changeStatusAsync.fulfilled, (state, action) => {
      state.changeStatus = REQUEST_STATE.FULFILLED;
      state.orderDetail = action.payload;
    })
    .addCase(changeStatusAsync.rejected, (state, action) => {
      state.changeStatus = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
  }
});

// ------------------ Getters ------------------- //
export const getCart = (state) => state.orders.cart;
export const getOrders = (state) => state.orders.orders;
export const getStats = (state) => state.orders.stats;
export const getSum = (state) => state.orders.sum;
export const getOrderDetails = (state) => state.orders.orderDetail;
export const getModified = (state) => state.orders.modified;

export default orderSlice.reducer;
