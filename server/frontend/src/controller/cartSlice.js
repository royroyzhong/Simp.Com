import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from './utils';
import { submitOrderAsync} from '../component/orders/orderThunks';

const INITIAL_STATE = {
  cart: [ 
    {
      _id: "8888",
      name: "egg",
      soldBy: "1234",
      price: 0,
      quantity: 1,
      storeName: "Gavin"
    }, 
    {
      _id:"9999",
      name:"sandwitch",
      soldBy:"1111",
      price: 0,
      quantity:1,
      storeName: "Gavin"
    }
],
  sum: 0,
  submitOrder: REQUEST_STATE.IDLE,
  addProductToCart: REQUEST_STATE.IDLE
}

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    updateQuantity(state, action) {
      let newValue = parseInt(action.payload.quantity);
      if (newValue >= 0) {
        let productIdx = state.cart.findIndex(p => p._id === action.payload._id);
        let diff = newValue - state.cart[productIdx].quantity;
        state.cart[productIdx].quantity= newValue;
        state.sum += state.cart[productIdx].price * diff;
        state.cart.sort((a,b) => a.name.localeCompare(b.name));
      }
    },
    deleteProduct(state, action) {
      let productToChange = state.cart.find(p => p._id === action.payload._id);
      state.sum -= productToChange.price * productToChange.quantity;
      state.cart = state.cart.filter(p => p._id !== action.payload._id);
    },
    addProduct(state, action) {
      let productIdx = state.cart.findIndex(p => p._id === action.payload._id);
      if (productIdx !== -1) {
        ++state.cart[productIdx].quantity;
        state.sum += state.cart[productIdx].price;
      } else {
        console.log(action.payload);
        state.cart.push({
          _id: action.payload._id,
          name: action.payload.name,
          soldBy: action.payload.soldBy,
          price: action.payload.price,
          quantity: 1,
          storeName: action.payload.storeName });
        state.sum += 0;
      }
    },
    loadFromStorage(state, action) {
      state.cart = action.payload;
      let price = 0;
      state.cart.forEach(item => {price += item.price*item.quantity;});
      state.sum = price;
    }
  },
  extraReducers: (builder) => {
    builder 
    .addCase(submitOrderAsync.pending, (state) => {
      state.submitOrder = REQUEST_STATE.PENDING;
    })
    .addCase(submitOrderAsync.fulfilled, (state, action) => {
      state.submitOrder = REQUEST_STATE.FULFILLED;
      state.cart = state.cart.filter(product => action.payload.findIndex(p => p._id === product._id) === -1);
    })
    .addCase(submitOrderAsync.rejected, (state, action) => {
      state.submitOrder = REQUEST_STATE.REJECTED;
    })
}
});

export const { updateQuantity, deleteProduct, addProduct, loadFromStorage} =
  cartSlice.actions;

// ------------------ Getters ------------------- // 
export const getCart = (state) => state.cart.cart;
export const getSum = (state) => state.cart.sum;

export default cartSlice.reducer;