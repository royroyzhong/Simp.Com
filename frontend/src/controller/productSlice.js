import { createSlice } from "@reduxjs/toolkit";
import { quinn, gavin } from "../utils/mockFetch";
import Product from "../model/product";

/**
 * Product Slice is only used for the editing page.
 */
const productSlice = createSlice({
  name: "product",
  initialState: {
    title: "",
    price: 0,
    tags: [],
    features: {}
  },
  reducers: {
    addTag: (state, action) => {state.tags.push(action.payload)},
    addFeature: (state, action) => {state.features[action.payload.title] = action.payload.description},
    loadProduct: (state, action) => {
      let product = action.payload;
      state.features = product.features;
      state.tags = product.tags;
      state.title = product.title;
      state.price = product.price;
    }
  },
});

// Export Setters
export const {addTag, addFeature, loadProduct} =
  productSlice.actions;

// ++++++++++++++++ Getters ++++++++++++++++++++ //
export const getTags = (state) => state.products.tags;
export const getFeatures = (state) => state.products.features;
export const getTitle = (state) => state.products.title;
export const getBufferProduct = (state) => {
  let ret = new Product();
  ret.title = getTitle(state);
  ret.tags = getTags(state);
  ret.features = getFeatures(state);
  ret.price = state.products.price;
  return ret;
}

export default productSlice.reducer;
