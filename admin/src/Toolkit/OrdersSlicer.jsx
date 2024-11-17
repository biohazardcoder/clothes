import { createSlice } from "@reduxjs/toolkit";

const OrderSlicer = createSlice({
  name: "Order",
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: "",
  },
  reducers: {
    getOrdersPending(state) {
      state.isPending = true;
      state.isError = "";
    },
    getOrdersSuccess(state, { payload }) {
      state.isAuth = true;
      state.data = payload;
      state.isPending = false;
    },
    getOrdersError(state, { payload }) {
      state.isPending = false;
      state.isError = payload;
    },
  },
});

export const { getOrdersError, getOrdersPending, getOrdersSuccess } = OrderSlicer.actions;
export default OrderSlicer.reducer;
