import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearImage } from "../store/slices/imageSlice";
import useApiCall from "../hooks/useApiCall";
import CustomAlert from "../components/CustomAlert";
import ImageUploader from "../components/ImageUploader";
import ApiResponse from "../components/ApiResponse";
import { clearFeedback, setFeedback } from "../store/slices/feedbackSlice";
import { showAlert } from "../store/slices/alertSlice";
import { clearFeatureSlice } from "../store/slices/featuresSlice";
import { Base_URL } from "../constants";

const MainPage = () => {
  const dispatch = useDispatch();
  const callApi = useApiCall();
  const [showResponse, setShowResponse] = useState(false);
  const [description, setDescription] = useState(""); // State to hold the text area value

  const { selectedImage, base64 } = useSelector((state) => state.image);

  // Handle submission of image to the API
  const handleSubmit = async () => {
    if (!selectedImage) {
      dispatch(
        showAlert({ type: "error", message: "Please upload an image first!" })
      );
      return;
    }

    try {
      setShowResponse(true);

      const base_url = Base_URL;
      const api = "/stylesense/api/feature_extraction/extract_features/";

      await callApi(base_url + api, "POST", {
        prod_img_bin_data: base64.split(",")[1], // Extract base64 data
        description: description, // Send the description from the text area
      });
    } catch (error) {
      dispatch(showAlert({ type: "error", message: error.message }));
    }
  };

  // Handle clearing the uploaded image
  const handleImageClear = () => {
    if (selectedImage) {
      dispatch(clearImage());
      dispatch(
        showAlert({
          type: "info",
          message: "Image removed successfully!",
        })
      );
    } else {
      dispatch(
        showAlert({
          type: "info",
          message: "No image to remove!",
        })
      );
    }
  };

  // Conditional rendering: show response page or upload form
  if (showResponse) {
    return (
      <div className="relative size-full">
        <CustomAlert />
        <ApiResponse
          onUploadAnotherImage={() => {
            dispatch(clearImage());
            setShowResponse(false);
            dispatch(clearFeatureSlice());
            dispatch(clearFeedback());
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <CustomAlert />
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Upload An Image
        </h2>

        {/* Image uploader component */}
        <ImageUploader />

        {/* Text Area for additional description */}
        <textarea
          className="w-full mt-4 p-2 border rounded-md"
          rows="4"
          placeholder="Add a description or additional notes here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Update description state
        />

        {/* Buttons for submission and clearing image */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Submit
          </button>
          <button
            onClick={handleImageClear}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
