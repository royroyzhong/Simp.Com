import { createSlice } from "@reduxjs/toolkit";
import Product from "../model/product";
import { quinn } from "../utils/mockFetch";

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
    ]
  },
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
export default sellerSlice.reducer;
