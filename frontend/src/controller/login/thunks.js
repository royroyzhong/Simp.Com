import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import UserService from "./service";

export const getUserAsync = createAsyncThunk(actionTypes.GET_USER, async () => {
  return await UserService.getUser();
});
export const loginAsync = createAsyncThunk(actionTypes.LOGIN, async (input) => {
  return await UserService.login(input);
});
export const signupAsync = createAsyncThunk(
  actionTypes.SIGNIN,
  async (input) => {
    return await UserService.signup(input);
  }
);
export const logoutAsync = createAsyncThunk(
  actionTypes.LOGOUT,
  async (input) => {
    return await UserService.logOutUser();
  }
);
export const googleloginAsync = createAsyncThunk(
  actionTypes.GOOGLELOGIN,
  async (input) => {
    return await UserService.googlelogin(input);
  }
);
