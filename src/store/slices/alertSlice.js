import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      state.alert = action.payload;
    },
    clearAlert(state) {
      state.alert = null;
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
