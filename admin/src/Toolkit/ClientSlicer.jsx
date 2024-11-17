import { createSlice } from "@reduxjs/toolkit";

const ClientSlicer = createSlice({
  name: "Client",
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: "",
  },
  reducers: {
    getClientPending(state) {
      state.isPending = true;
      state.isError = "";
    },
    getClientSuccess(state, { payload }) {
      state.isAuth = true;
      state.data = payload;
      state.isPending = false;
    },
    getClientError(state, { payload }) {
      state.isPending = false;
      state.isError = payload;
    },
  },
});

export const { getClientError, getClientPending, getClientSuccess } =
  ClientSlicer.actions;
export default ClientSlicer.reducer;
