import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../api/client";
import { productActionTypes } from "../component/sellerDashboard/productActionTypes";
import { REQUEST_STATE } from "./utils";
import {
  addToWishlist,
  restockProduct,
  deleteFromWishlist,
  getWishlistStatus,
} from "../component/sellerDashboard/productService";

export const postNewProduct = createAsyncThunk(
  "/product/post",
  async function (data) {
    let features = data.features;
    let descriptions = Object.entries(features).map(([key, val]) => {
      return { title: key, content: val };
    });
    data.descriptions = descriptions;
    let images = data.images;
    let imagesFetchSigs = [];
    for (let img of images) {
      imagesFetchSigs.push(
        fetchAPI("POST", img, {}, "image").then((response) => {
          return response.status === 200 ? response.text() : null;
        })
      );
    }

    data.images = [];
    await Promise.all(imagesFetchSigs).then((i) => {
      for (let img of i) if (img !== null) data.images.push(img);
    });
    return fetchAPI("POST", data, {}, "products").then((response) =>
      response.text()
    );
  }
);

export const updateProduct = createAsyncThunk(
  "/product/patch",
  async function (data) {
    let features = data.features;
    let descriptions = Object.entries(features).map(([key, val]) => {
      return { title: key, content: val };
    });
    data.descriptions = descriptions;

    let images = data.images;
    let imagesFetchSigs = [];
    for (let img of images) {
      if (img._id === undefined)
        imagesFetchSigs.push(
          fetchAPI("POST", img, {}, "image").then((response) => {
            return response.status === 200 ? response.text() : null;
          })
        );
    }

    data.images = data.images
      .filter((i) => i._id !== undefined && i._id !== null)
      .map((i) => i._id);
    await Promise.all(imagesFetchSigs).then((i) => {
      for (let img of i) if (img !== null) data.images.push(img);
    });

    return fetchAPI("PATCH", data, {}, "products").then((response) =>
      response.text()
    );
  }
);

export const restockProductAsync = createAsyncThunk(
  productActionTypes.RESTOCK_PRODUCT,
  async (productId) => {
    return await restockProduct(productId);
  }
);

export const addToWishlistAsync = createAsyncThunk(
  productActionTypes.ADD_TO_WISHLIST,
  async (productId) => {
    return await addToWishlist(productId);
  }
);

export const deleteFromWishlistAsync = createAsyncThunk(
  productActionTypes.DELETE_FROM_WISHLIST,
  async (productId) => {
    return await deleteFromWishlist(productId);
  }
);

export const getWishlistStatusAsync = createAsyncThunk(
  productActionTypes.GET_WISHTLIST_STATUS,
  async (productId) => {
    const result = await getWishlistStatus(productId);

    return result;
  }
);

/**
 * Product Slice is only used for the editing page.
 */
const INITIAL_STATE = {
  name: "",
  title: "",
  price: 0,
  storage: 0,
  tags: [],
  features: {},
  images: [],
  wishlistFlag: false,
  // status
  restockProductStatus: REQUEST_STATE.IDLE,
  addToWishlistStatus: REQUEST_STATE.IDLE,
  deleteFromWishlistStatus: REQUEST_STATE.IDLE,
  wishlistStatus: REQUEST_STATE.IDLE,
  imageUploadStatus: "good",
};

const productSlice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setStorage: (state, action) => {
      state.storage = action.payload;
    },
    addFeature: (state, action) => {
      state.features[action.payload.title] = action.payload.description;
    },
    loadProduct: (state, action) => {
      let product = action.payload;
      state.name = product.name;
      state.features = product.features;
      state.tags = product.tags;
      state.title = product.title;
      state.price = product.price;
      state.storage = product.storage;
      state.images = product.images;
    },
    addImage: (state, action) => {
      state.images.push({ id: state.images.length, src: action.payload });
    },
    rmvTag: (state, action) => {
      state.tags = state.tags.filter((t) => t !== action.payload);
    },
    rmvFeature: (state, action) => {
      delete state.features[action.payload];
    },
    setWishlistFlag: (state, action) => {
      state.wishlistFlag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(restockProductAsync.fulfilled, function (state, action) {
        state.restockProductStatus = REQUEST_STATE.FULFILLED;
        state.wishlistUsers = [];
      })
      .addCase(addToWishlistAsync.fulfilled, function (state, action) {
        state.addToWishlistStatus = REQUEST_STATE.FULFILLED;
      })
      .addCase(deleteFromWishlistAsync.fulfilled, function (state, action) {
        state.deleteFromWishlistStatus = REQUEST_STATE.FULFILLED;
      })
      .addCase(getWishlistStatusAsync.fulfilled, function (state, action) {
        state.wishlistStatus = REQUEST_STATE.FULFILLED;
        state.wishlistFlag = action.payload;
      });
  },
});

// Export Setters
export const {
  setName,
  rmvFeature,
  rmvTag,
  setTitle,
  addTag,
  addFeature,
  loadProduct,
  setStorage,
  setPrice,
  addImage,
  setWishlistFlag,
} = productSlice.actions;

// ++++++++++++++++ Getters ++++++++++++++++++++ //
export const getTags = (state) => state.products.tags;
export const getFeatures = (state) => state.products.features;
export const getName = (state) => state.products.name;
export const getTitle = (state) => state.products.title;
export const getPrice = (state) => state.products.price;
export const getStorage = (state) => state.products.storage;
export const getBufferProduct = (state) => {
  return {
    title: getTitle(state),
    tags: getTags(state),
    features: getFeatures(state),
    name: getName(state),
    price: state.products.price,
    storage: state.products.storage,
    images: state.products.images,
  };
};
export const getImages = (state) => state.products.images;

export default productSlice.reducer;
