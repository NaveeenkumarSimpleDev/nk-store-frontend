import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuth, createUser, loginUser } from "./authAPI";

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

    // the value is used in fulfilled action.payload
    return response;
  }
);

export const loginUserAsync = createAsyncThunk("user/login", async (data) => {
  const response = await loginUser(data);
  return response;
});

export const checkAuthAsync = createAsyncThunk("user/check", async () => {
  const response = await checkAuth();
  return response;
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
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      });
  },
});

export default authSlice.reducer;

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
