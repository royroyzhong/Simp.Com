import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../api/client";
import { current } from "@reduxjs/toolkit";

export const postNewProduct = createAsyncThunk('/product/post', async function(data) {
  let features = data.features;
  let descriptions = Object.entries(features).map(([key, val]) => {return {title: key, content: val}})
  data.descriptions = descriptions;
  return fetchAPI('POST', data, {}, 'products').then(response => response.text());
})

export const updateProduct = createAsyncThunk('/product/patch', async function(data) {
  let features = data.features;
  let descriptions = Object.entries(features).map(([key, val]) => {return {title: key, content: val}})
  data.descriptions = descriptions;
  return fetchAPI('PATCH', data, {}, 'products').then(response => response.text());
})

/**
 * Product Slice is only used for the editing page.
 */

 const INITIAL_STATE = {
  name: "",
  title: "",
  price: 0,
  tags: [],
  features: {},
  images:[]
}

const productSlice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  reducers: {
    setName: (state, action) => {state.name = action.payload},
    setTitle: (state, action) => {state.title = action.payload},
    addTag: (state, action) => {state.tags.push(action.payload)},
    addFeature: (state, action) => {state.features[action.payload.title] = action.payload.description},
    loadProduct: (state, action) => {
      let product = action.payload;
      state.name = product.name;
      state.features = product.features;
      state.tags = product.tags;
      state.title = product.title;
      state.price = product.price;
    },
    addImage: (state,action) => {
      state.images.push({id:state.images.length, src:action.payload});
      console.log(current(state))
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(postNewProduct.fulfilled, function(state, action) {
      console.log("save succeeded");
    })
    .addCase(updateProduct.fulfilled, function(state, action) {
      console.log("update succeeded");
    })
  }
});

// Export Setters
export const {setName, setTitle, addTag, addFeature, loadProduct,addImage} =
  productSlice.actions;

// ++++++++++++++++ Getters ++++++++++++++++++++ //
export const getTags = (state) => state.products.tags;
export const getFeatures = (state) => state.products.features;
export const getName = (state) => state.products.name;
export const getTitle = (state) => state.products.title;
export const getBufferProduct = (state) => {
  return {
    title: getTitle(state),
    tags: getTags(state),
    features: getFeatures(state),
    name: getName(state),
    price: state.products.price
  };
};
export const getImages = (state) => state.products.images;


export default productSlice.reducer;
