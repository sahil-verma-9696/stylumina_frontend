import { configureStore } from "@reduxjs/toolkit";
import loadFeatureReducer from "./slices/featuresSlice";
import imageReducer from "./slices/imageSlice";
export default configureStore({
  reducer: {
    features: loadFeatureReducer,
    image: imageReducer,
  },
});
