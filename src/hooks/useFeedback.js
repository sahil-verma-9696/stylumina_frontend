import { useDispatch } from "react-redux";
import {
  startLoading,
  setFeedback,
  setError,
  finishLoading,
} from "../store/slices/feedbackSlice";
import { showAlert } from "../store/slices/alertSlice";

const useFeedback = () => {
  const dispatch = useDispatch();

  const processFeedback = async (url, method = "POST", feedbackData = null) => {
    try {
      dispatch(startLoading()); // Start feedback loading
      dispatch(showAlert({ type: "info", message: "Processing feedback..." }));

      const response = await fetch(url, {
        method: method,
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: feedbackData ? JSON.stringify(feedbackData) : null,
      });

      if (!response.ok) {
        throw new Error(`Feedback submission failed with status: ${response.status}`);
      }

      const responseData = await response.json();
      dispatch(setFeedback(responseData)); // Update feedback state
      dispatch(finishLoading()); // Mark feedback loading as complete
      dispatch(
        showAlert({
          type: "success",
          message: "Feedback submitted successfully!",
        })
      );
    } catch (error) {
      console.error("Feedback processing error:", error.message);
      dispatch(setError(error.message)); // Set error state in Redux
      dispatch(
        showAlert({
          type: "error",
          message: `Feedback processing error: ${error.message}`,
        })
      ); // Show error alert
    }
  };

  return processFeedback;
};

export default useFeedback;
