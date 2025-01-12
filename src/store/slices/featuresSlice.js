import { createSlice } from "@reduxjs/toolkit";

const featuresSlice = createSlice({
  name: "features",
  initialState: {
    features: [], // Store feature data
    related_product: [], // Store related product data
    loading: false,
    error: null,
  },

  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setChunkData: (state, action) => {
      const { message_type, message_data } = action.payload;
      // console.log("Message Type:", message_type, "Message Data:", message_data);

      if (message_type === "related_products") {
        if (message_data.length > 0) {
          state.related_product.push(message_data);
        }
      } else {
        state.features.push(message_data);
      }
    },
    clearFeatureSlice: (state, action) => {
      state.features = [];
      state.related_product = [];
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  setChunkData,
  setError,
  finishLoading,
  clearFeatureSlice,
} = featuresSlice.actions;
export default featuresSlice.reducer;
