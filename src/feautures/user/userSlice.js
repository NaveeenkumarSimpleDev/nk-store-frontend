import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserById } from "./userAPI";

const initialState = {
  status: "idle",
  user: null,
};

export const fetchUserByIdAsync = createAsyncThunk(
  "user/own",
  async (userd) => {
    const response = await fetchUserById(userd);
    // the value is used in fulfilled action.payload
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;

export const selectUser = (state) => state.user?.user;
