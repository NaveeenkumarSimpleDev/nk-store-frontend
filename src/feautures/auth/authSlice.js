import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuth, createUser, loginUser, logout } from "./authAPI";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  userChecked: false,
};

export const createuserAsync = createAsyncThunk(
  "user/signUp",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  },
);

export const loginUserAsync = createAsyncThunk("user/login", async (data) => {
  const response = await loginUser(data);
  return response;
});

export const checkAuthAsync = createAsyncThunk("user/check", async () => {
  const response = await checkAuth();
  return response;
});

export const logoutUserAsync = createAsyncThunk("user/logout", async () => {
  await logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createuserAsync.pending, (state) => {
        state.error = {};
        state.status = "loading";
      })
      .addCase(createuserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload?.error) {
          state.error = { signUp: action.payload };
        } else {
          state.loggedInUserToken = action.payload;
        }
      })
      .addCase(createuserAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.error = {};
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload?.error) {
          state.error = { login: action.payload };
        } else {
          state.loggedInUserToken = action.payload;
          state.error = {};
        }
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.loggedInUserToken = null;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.status = "idle";
        state.loggedInUserToken = null;
        state.userChecked = false;
      });
  },
});

export default authSlice.reducer;

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectAuthStatus = (state) => state.auth.status;
