import { createSlice } from "@reduxjs/toolkit";

const featuresSlice = createSlice({
  name: "features",
  initialState: {}, // State is a list of notes

  reducers: {
    loadFeature: (state, action) => {
      return action.payload;
    },
    unloadFeature: (state, action) => {
      return null;
    },
  },
});

export const { loadFeature, unloadFeature } = featuresSlice.actions;
export default featuresSlice.reducer;
