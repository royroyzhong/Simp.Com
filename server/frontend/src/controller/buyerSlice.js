import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAPI } from "../api/client";
import { getBuyerOrderAsync } from "../component/orders/orderThunks";
import { REQUEST_STATE } from "./utils";

export const getProducts = createAsyncThunk('/products/get', async function () {
  let res = fetchAPI('GET', {}, {}, 'products').then(response => response.json())
    .then(products => {
      let pSigs = [];
      for (let p of products) {
        let imagesFetchSigs = [];
        for (let id of p.images) {
          imagesFetchSigs.push(fetchAPI('GET', {}, { id: id }, 'image')
            .then(res => {
              return res.json()
            }))
        }
        pSigs.push(Promise.all(imagesFetchSigs)
          .then(sigs => {
            p.images = sigs;
            return p;
          })
        )
      }
      return Promise.all(pSigs);
    })
  return res;

});

const INITIAL_STATE = {
  orderHistory: [],
  displayProducts: [],
  getOrderHistoryStatus: REQUEST_STATE.IDLE
};

const userSlice = createSlice({
  name: "buyer",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, function (state, action) {
        state.displayProducts = action.payload;
      })
      .addCase(getProducts.rejected, function (state, action) {
        console.log(action);
      })
      .addCase(getBuyerOrderAsync.fulfilled, function (state, action) {
        state.orderHistory = action.payload;
      })
      .addCase(getBuyerOrderAsync.rejected, function (state, action) {
        console.log(action);
      })
  }
});

export const getOrderHistory = (state) => state.buyer.orderHistory;
export const getDisplayProductList = (state) => state.buyer.displayProducts;

export default userSlice.reducer;
