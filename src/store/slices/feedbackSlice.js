import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false, // To track loading state
  error: null, // To store any error messages
  feedback: {},
  toggleFeedback: false,
  isChangeValue: false,
};
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload; // Set error message
      state.isLoading = false; // Stop loading
    },
    startLoading(state) {
      state.isLoading = true; // Set loading state to true
      state.error = null; // Clear any previous errors
    },
    finishLoading(state) {
      state.isLoading = false; // Set loading state to false
    },
    setFeedback(state, action) {
      const { message_type, message_data } = action.payload;

      if (message_type === "related_products") {
      } else {
        if (message_data && message_data?.product_category && message_data?.feature_value) {
          const confidence_score = message_data?.confidence_score;
          const feature_name = message_data?.feature_name;
          const feature_value = message_data?.feature_value;
          const product_category = message_data?.product_category;

          if (!state.feedback[product_category]) {
            state.feedback[product_category] = [];
          }

          // Push the feature object into the array
          state.feedback[product_category].push({
            feature_name,
            feature_value,
            confidence_score,
          });
        }
      }
    },
    clearFeedback(state) {
      state.feedback = {};
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
  setError,
  startLoading,
  finishLoading,

} = feedbackSlice.actions;
export default feedbackSlice.reducer;
