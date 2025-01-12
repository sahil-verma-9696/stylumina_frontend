import { configureStore } from "@reduxjs/toolkit";
// import loadFeatureReducer from "./slices/featuresSlice";
import imageReducer from "./slices/imageSlice";
import feedbackReducer from "./slices/feedbackSlice";
export default configureStore({
  reducer: {
    // features: loadFeatureReducer,
    image: imageReducer,
    feedback: feedbackReducer,
  },
});
