import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
// 1. what if i want to add one more reducer say for sending emails can i add it here
export const store = configureStore({ reducer: { auth: authReducer } });
