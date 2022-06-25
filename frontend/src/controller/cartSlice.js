import { createSlice } from "@reduxjs/toolkit";
import { mockBuyer } from "../utils/mockBuyer";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userName: mockBuyer.username,
    cart: mockBuyer.cart,
  },
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
      state.cart.sum += productToChange.price * productToChange.quantity
      state.cart.products = state.cart.products.filter(p => p.id !== action.payload.id)
    }
  }
})

export const { updateQuantity,deleteProduct} =
  cartSlice.actions;

// ------------------ Getters ------------------- // 
export const getCart = (state) => state.cart.cart;

export default cartSlice.reducer;