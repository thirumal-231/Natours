import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

// syntax of asynthunks

// login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post(
        "http://localhost:3003/api/v1/users/login",
        credentials,
        { withCredentials: true }
      );
      return res.data.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// check logged in user
export const getMe = createAsyncThunk("auth.getMe", async (_, thunkAPI) => {
  try {
    const res = await api.get("http://localhost:3003/api/v1/users/me", {
      withCredentials: true,
    });
    return res.data.data.doc;
  } catch (err) {
    return thunkAPI.rejectWithValue(null);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // get me
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
