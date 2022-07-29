import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockBuyer } from "../utils/mockBuyer";
import { fetchAPI } from "../api/client";

export const getProducts = createAsyncThunk('/products/get', async function() {
  return fetchAPI('GET', {}, {}, 'products').then(response => response.json());
});

export const getOrders = createAsyncThunk('/order/buyer', async function() {
  return fetchAPI('GET', {}, {}, 'order/buyer').then(response => response.json());
});

const INITIAL_STATE = {
  orderHistory:mockBuyer.orderHistory,
  displayProducts: []
};
 
const userSlice = createSlice({
  name: "buyer",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
    .addCase(getProducts.fulfilled, function(state, action) {
      state.displayProducts = action.payload;
    })
    .addCase(getProducts.rejected, function(state, action) {
      console.log(action);
    })
    .addCase(getOrders.fulfilled, function(state, action) {
      state.orderHistory = action.payload;
    })
    .addCase(getOrders.rejected, function(state, action) {
      console.log(action);
    })
  }
});

export const getOrderHistory = (state) => state.buyer.orderHistory;
export const getDisplayProductList = (state) => state.buyer.displayProducts;

export default userSlice.reducer;
