import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAddress,
  fetchAddressByUserId,
  fetchOrdersByUserId,
  updateAddress,
} from "./orderAPI";

const initialState = {
  items: [],
  addresses: null,
  selectedAddress: null,
};

export const fetchOrderByUserIdAsync = createAsyncThunk(
  "orders",
  async (userId) => {
    const response = await fetchOrdersByUserId(userId);
    return response;
  }
);
export const createAddressAsync = createAsyncThunk(
  "address/create",
  async (data) => {
    const response = await createAddress(data);
    return response;
  }
);
export const updateAddressAsync = createAsyncThunk(
  "address/update",
  async (data) => {
    const response = await updateAddress(data);
    return response;
  }
);
export const fetchAddressByUserIdAsync = createAsyncThunk(
  "address/fetch",
  async (data) => {
    const response = await fetchAddressByUserId(data);
    return response;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    addAddressLocally: (state, action) => {
      state.addresses.push(action.payload);
    },
    deleteAddressLocally: (state, action) => {
      state.addresses = state.addresses.filter(
        (i) => i.id !== action.payload.id
      );
      if (state.selectedAddress === action.payload.id) {
        state.selectedAddress = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByUserIdAsync.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchAddressByUserIdAsync.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(createAddressAsync.fulfilled, (state, action) => {
        if (state.addresses) {
          state.addresses.push(action.payload);
        } else {
          state.addresses = [].push(action.payload);
        }
      })
      .addCase(updateAddressAsync.fulfilled, (state, action) => {
        const addresses = state.addresses;
        if (!addresses) {
          state.addresses = [].push(action.payload);
        } else {
          const exsistingIndext = addresses.findIndex(
            (add) => add.id === action.payload.id
          );

          state.addresses[exsistingIndext] = action.payload;
        }
      });
  },
});
export const { setSelectedAddress, deleteAddressLocally, addAddressLocally } =
  orderSlice.actions;
export default orderSlice.reducer;

export const selectOrders = (state) => state.orders.items;
export const selectAddress = (state) => state.orders.selectedAddress;
export const selectAddresses = (state) => state.orders.addresses;
