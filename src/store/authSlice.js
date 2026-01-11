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

// signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post(
        "http://localhost:3003/api/v1/users/signup",
        credentials,
        { withCredentials: true }
      );
      return res.data.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await api.get(
      "http://localhost:3003/api/v1/users/logout",
      {},
      { withCredentials: true }
    );
    return true;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Logout failed"
    );
  }
});

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

export const updateMe = createAsyncThunk(
  "auth/updateMe",
  async (formData, thunkAPI) => {
    try {
      const res = await api.patch(
        `http://localhost:3003/api/v1/users/updateMe`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, thunkAPI) => {
    try {
      const res = await api.patch(
        "http://localhost:3003/api/v1/users/updateMyPassword",
        data,
        { withCredentials: true }
      );
      return res.data.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Password change failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    status: "idle",
    updateStatus: "idle",
    passwordStatus: "idle",
    error: null,
  },
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
    },
    resetPasswordUpdateStatus: (state) => {
      state.passwordStatus = "idle";
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
      // signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      })

      // update me
      .addCase(updateMe.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateMe.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateMe.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })

      // passwordchange
      .addCase(updatePassword.pending, (state) => {
        state.passwordStatus = "loading";
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.passwordStatus = "succeeded";
        state.user = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.passwordStatus = "failed";
        state.error = action.payload;
      })

      // get me
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetUpdateStatus, resetPasswordUpdateStatus } =
  authSlice.actions;
export default authSlice.reducer;
