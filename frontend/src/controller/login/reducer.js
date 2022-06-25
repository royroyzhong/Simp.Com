import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import { getUserAsync, loginAsync } from "./thunks";

const INITIAL_STATE = {
  user: {},
  login: REQUEST_STATE.IDLE,
  addUser: REQUEST_STATE.IDLE,
  error: null,
};

const loginSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.getUsers = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.getUsers = REQUEST_STATE.FULFILLED;
        state.user = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.getUsers = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(loginAsync.pending, (state) => {
        state.login = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.login = REQUEST_STATE.FULFILLED;
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.login = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  },
});

export default loginSlice.reducer;
