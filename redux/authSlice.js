"use client";

// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
  isAuth: false, // Default to not authenticated
  token: null,
  username: null,
};

// Create slice with reducers for login/logout actions
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.username = null;
    },
    rehydrate: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export actions
export const { login, logout, rehydrate } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
