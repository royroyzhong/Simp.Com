import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../api/client";
import { quinn } from "../utils/mockFetch";

export const getProducts = createAsyncThunk('/products/get', async function() {
  return fetchAPI('GET', {}, { isBuyer: false }, 'products').then(response => response.json());
});

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    firstName: quinn.firstName,
    lastName: quinn.lastName,
    address: quinn.address,
    email: quinn.email,
    phone: quinn.phone,
    compangName: quinn.compangName,

    // Seller inventory
    inventory: [
    ],
    inventoryStatus: "idle"
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, function(state, action) {
      state.inventory = action.payload;
      state.inventoryStatus = 'succeed';
    })
    .addCase(getProducts.rejected, function(state, action) {
      console.log(action);
    })
  }
});

export const {addProduct} = sellerSlice.actions;

// ------------------ Getters ------------------- //
export const getFirstName = (state) => state.seller.firstName;
export const getLastName = (state) => state.seller.lastName;
export const getAddress = (state) => state.seller.address;
export const getEmail = (state) => state.seller.email;
export const getPhone = (state) => state.seller.phone;
export const getCompanyName = (state) => state.seller.compangName;

export const getProductList = (state) => state.seller.inventory;
export const getProductListStatus = (state) => state.seller.inventoryStatus;
export default sellerSlice.reducer;
