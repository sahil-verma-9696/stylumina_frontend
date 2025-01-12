import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  feedback: null,
  toggleFeedback: false,
  isChangeValue: false,
};
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedback(state, action) {
      state.feedback = action.payload;
    },
    clearFeedback(state) {
      state.feedback = null;
    },
    toggleFeedbackPopup(state, action) {
      state.toggleFeedback = !state.toggleFeedback;
    },

    toggleChangeValue(state, action) {
      state.isChangeValue = !state.isChangeValue;
    },

    removeFeature(state, action) {
      const { category, feature_name, feature_value } = action.payload;

      if (state.feedback[category]) {
        state.feedback[category] = state.feedback[category].filter(
          (feature) =>
            !(
              feature.feature_name === feature_name &&
              feature.feature_value === feature_value
            )
        );
      }
    },
    
    changeFeatureValue(state, action) {
      const { category, feature_name, new_value } = action.payload;

      if (state.feedback[category]) {
        const feature = state.feedback[category].find(
          (feature) => feature.feature_name === feature_name
        );
        if (feature) {
          feature.feature_value = new_value; // Update the feature value
        } else {
          console.warn(
            `Feature "${feature_name}" not found in category "${category}".`
          );
        }
      } else {
        console.warn(`Category "${category}" does not exist in feedback.`);
      }
    },
    addFeature(state, action) {
      const { category, feature } = action.payload;

      if (!state.feedback[category]) {
        state.feedback[category] = []; // Initialize the category if it doesn't exist
      }
      state.feedback[category].push(feature); // Add the new feature to the category
    },
  },
});

export const {
  setFeedback,
  clearFeedback,
  toggleFeedbackPopup,
  changeFeatureValue,
  removeFeature,
  toggleChangeValue,
} = feedbackSlice.actions;
export default feedbackSlice.reducer;
