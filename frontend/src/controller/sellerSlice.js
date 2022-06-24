import { createSlice } from "@reduxjs/toolkit";
import Product from "../model/product";
import { quinn, gavin } from "../utils/mockFetch";

let product = new Product("quinn");
product.title = "hello world";
product.imgRefs = ['book'];

let p2 = new Product("quinn");
p2.title = "product 2";

let p3 = new Product("quinn");
p3.title = "product 3";

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
      product, p2, p3
    ]
  },
  reducers: {
    addProduct: (state, action) => {
      this.inventory.push(action.payload);
    }
  }
});

// ------------------ Getters ------------------- //
export const getFirstName = (state) => state.seller.firstName;
export const getLastName = (state) => state.seller.lastName;
export const getAddress = (state) => state.seller.address;
export const getEmail = (state) => state.seller.email;
export const getPhone = (state) => state.seller.phone;
export const getCompanyName = (state) => state.seller.compangName;

export const getProductList = (state) => state.seller.inventory;
export default sellerSlice.reducer;
