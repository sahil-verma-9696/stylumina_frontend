import { createSlice } from "@reduxjs/toolkit";

const featuresSlice = createSlice({
  name: "features",
  initialState: {
    features: {}, // Store feature data
    related_product: {}, // Store related product data
    loading: false,
    error: null
  },

  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setChunkData: (state, action) => {
      const { message_type, message_data } = action.payload;
      console.log("Message Type:", message_type, "Message Data:", message_data);


      const feature = {
        "watches":[]
      }


      // Check if message_type exists and proceed to update the correct section of the state
      if (message_type === "related_products") {
        // Append new related product data to the existing state
        state.related_product = {
          ...state.related_product, // Retain previous related_product data
          ...message_data, // Add new data (you can modify this logic based on the data structure)
        };
      } else if (message_type === "product_feature") {
        // If it's a product feature, ensure the data is correctly structured
        if (message_data && message_data.feature_name) {
          // Append or update the feature data
          feature = 
          state.features = {
            ...state.features, // Retain previous features data
            [message_data.feature_name]: message_data, // Add or replace the specific feature
          };
        }
      }
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

export const { startLoading, setChunkData, setError, finishLoading } = featuresSlice.actions;
export default featuresSlice.reducer;
