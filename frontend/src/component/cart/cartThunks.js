import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderActionTypes } from './orderActionTypes';
import orderService from './orderService';

export const submitOrderAsync = createAsyncThunk(
    orderActionTypes.SUBMIT_ORDER,
    async (products) => {
        return await orderService.submitOrder(products);
    }
)

export const getOrderAsync = createAsyncThunk(
    orderActionTypes.GET_ORDER,
    async () => {
        return await orderService.getOrder();
    }
)

export const changeStatusAsync = createAsyncThunk(
    orderActionTypes.CHANGE_STATUS,
    async (orderToChange) => {
        return await orderService.changeStatus(orderToChange);
    }

)