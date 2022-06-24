import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import UserService from "./service";

export const getUserAsync = createAsyncThunk(actionTypes.GET_USER, async () => {
  return await UserService.getUser();
});

export const loginAsync = createAsyncThunk(actionTypes.LOGIN, async (input) => {
  return await UserService.login(input);
});
