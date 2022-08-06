import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAPI } from "../api/client";
import { getBuyerOrderAsync } from "../component/orders/orderThunks";

export const getProducts = createAsyncThunk('/products/get', async function() {
  return fetchAPI('GET', {}, {}, 'products').then(response => response.json());
});

const INITIAL_STATE = {
  orderHistory: [],
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
    .addCase(getBuyerOrderAsync.fulfilled, function(state, action) {
      state.orderHistory = action.payload;
    })
    .addCase(getBuyerOrderAsync.rejected, function(state, action) {
      console.log(action);
    })
  }
});

export const getOrderHistory = (state) => state.buyer.orderHistory;
export const getDisplayProductList = (state) => state.buyer.displayProducts;

export default userSlice.reducer;
