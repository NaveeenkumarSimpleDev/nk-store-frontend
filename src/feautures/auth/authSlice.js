import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuth, createUser, loginUser, logout } from "./authAPI";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  userChecked: false,
};

export const createuserAsync = createAsyncThunk(
  "user/signUp",
  async (userData) => {
    const response = await createUser(userData);
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
  reducers: {
    setUser: (state, action) => {
      state.loggedInUserToken = action.payload;
    },

    logOutUser: (state) => {
      state.loggedInUserToken = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createuserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createuserAsync.fulfilled, (state, action) => {
        state.loggedInUserToken = action.payload;
      })
      .addCase(createuserAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.loggedInUserToken = action.payload;
      })
      .addCase(checkAuthAsync.rejected, (state) => {
        state.loggedInUserToken = null;
      });
  },
});

export const { setUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectAuthStatus = (state) => state.auth.status;
