import { createSlice } from "@reduxjs/toolkit";
import { mockBuyer } from "../utils/mockBuyer";
import { REQUEST_STATE } from './utils';
import { getOrderAsync, submitOrderAsync, changeStatusAsync } from '../component/cart/cartThunks';

const INITIAL_STATE = {
  userName: mockBuyer.username,
  cart: mockBuyer.cart,
  submitOrder: REQUEST_STATE.IDLE,
  getOrder: REQUEST_STATE.IDLE,
  changeStatus: REQUEST_STATE.IDLE
}

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    updateQuantity(state, action) {
      let newValue = parseInt(action.payload.quantity)
      if (newValue >= 0) {
      let productToChange = state.cart.products.find(p => p.id === action.payload.id)
      let diff = newValue- productToChange.quantity 
      state.cart.products = state.cart.products.filter(p => p.id !== action.payload.id)
      productToChange.quantity= newValue
      state.cart.sum += productToChange.price * diff
      state.cart.products.push(productToChange)
      state.cart.products.sort((a,b) => a.productName.localeCompare(b.productName))
      }
    },
    deleteProduct(state,action) {
      let productToChange = state.cart.products.find(p => p.id === action.payload.id)
      state.cart.sum -= productToChange.price * productToChange.quantity
      state.cart.products = state.cart.products.filter(p => p.id !== action.payload.id)
    }
  },
  extraReducers: (builder) => {
    builder 
    .addCase(submitOrderAsync.pending, (state) => {
      state.submitOrder = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(submitOrderAsync.fulfilled, (state,action) => {
      state.submitOrder = REQUEST_STATE.FULFILLED;
      state.cart = [];
    })
    .addCase(submitOrderAsync.rejected, (state,action) => {
      state.submitOrder = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
    .addCase(getOrderAsync.pending, (state) => {
      state.getOrder = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(getOrderAsync.fulfilled, (state, action) => {
      state.getOrder = REQUEST_STATE.FULFILLED;
      state.cart = action.payload;
    })
    .addCase(getOrderAsync.rejected, (state, action) => {
      state.getOrder = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
    .addCase(changeStatusAsync.pending, (state) => {
      state.changeStatus = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(changeStatusAsync.fulfilled, (state, action) => {
      state.changeStatus = REQUEST_STATE.FULFILLED;
    })
    .addCase(changeStatusAsync.rejected, (state, action) => {
      state.changeStatus = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
}
})

export const { updateQuantity,deleteProduct} =
  cartSlice.actions;

// ------------------ Getters ------------------- // 
export const getCart = (state) => state.cart.cart;

export default cartSlice.reducer;