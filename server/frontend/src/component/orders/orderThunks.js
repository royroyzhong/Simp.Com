import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderActionTypes } from "./orderActionTypes";
import orderService from "./orderService";

export const submitOrderAsync = createAsyncThunk(
  orderActionTypes.SUBMIT_ORDER,
  async (products) => {
    let result = await orderService.submitOrder(products);

    return result;
  }
);

export const getBuyerOrderAsync = createAsyncThunk(
  orderActionTypes.GET_BUYER_ORDER,
  async () => {
    return await orderService.getBuyerOrder();
  }
);

export const getSellerOrderAsync = createAsyncThunk(
  orderActionTypes.GET_SELLER_ORDER,
  async () => {
    return await orderService.getSellerOrder();
  }
);

export const changeStatusAsync = createAsyncThunk(
  orderActionTypes.CHANGE_STATUS,
  async (object) => {
    return await orderService.changeStatus(object);
  }
);
