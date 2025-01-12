import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImage: null,
  base64: "",
  preview: null, // For image preview
  // alert: null, // For alert messages
  // apiResponse: null, // For API response
  // isLoading: false, // For shimmer loader
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage(state, action) {
      // console.log(action.payload);
      state.selectedImage = action.payload.image;
      state.base64 = action.payload.base64;
    },
    clearImage(state) {
      state.selectedImage = null;
      state.base64 = "";
      state.preview = null;
    },
    setPreview(state, action) {
      state.preview = action.payload;
    },

    // setLoading(state, action) {
    //   state.isLoading = action.payload;
    // },
    // setApiResponse(state, action) {
    //   state.apiResponse = action.payload;
    // },
    // clearApiResponse(state) {
    //   state.apiResponse = null;
    // },
  },
});

export const {
  setImage,
  clearImage,
  setPreview,
  showAlert,
  clearAlert,
  setLoading,
  setApiResponse,
  clearApiResponse,
} = imageSlice.actions;

export default imageSlice.reducer;
