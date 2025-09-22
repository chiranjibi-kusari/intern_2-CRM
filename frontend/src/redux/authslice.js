import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

const initialState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, role } = action.payload;
      state.token = token;
      state.role = role;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
     
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
