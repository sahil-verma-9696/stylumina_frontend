import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearImage,
  setApiResponse,
  showAlert,
  setLoading,
} from "../store/slices/imageSlice";
import useApiCall from "../hooks/useApiCall";
import CustomAlert from "../components/CustomAlert";
import ShimmerEffect from "../components/ShimmerEffect";
import ImageUploader from "../components/ImageUploader";
import ApiResponse from "../components/ApiResponse"; // Import the new component
import { setFeedback } from "../store/slices/feedbackSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const callApi = useApiCall();

  const { selectedImage, base64 } = useSelector((state) => state.image);
  const { apiResponse, isLoading } = useSelector((state) => state.image);

  const handleSubmit = async () => {
    if (!selectedImage) {
      dispatch(
        showAlert({ type: "error", message: "Please upload an image first!" })
      );
      return;
    }

    try {
      setLoading(true); // Start shimmer effect
      const response = await callApi(
        "http://localhost:5000/api/upload",
        "POST",
        { image: base64.split(",")[1] }
      );
      dispatch(setApiResponse(response));
      dispatch(setFeedback(response.feature_data));
      dispatch(
        showAlert({ type: "success", message: "Image uploaded successfully!" })
      );
    } catch (error) {
      // Error handled in the custom hook
    } finally {
      setLoading(false); // Stop shimmer effect
    }
  };

  if (isLoading) {
    return (
      <div className="relative">
        <CustomAlert />
        <ShimmerEffect />
      </div>
    );
  }

  if (apiResponse) {
    return (
      <div className="relative">
        <CustomAlert />
        <ApiResponse
          apiResponse={apiResponse}
          onUploadAnotherImage={() => {
            dispatch(setApiResponse(null));
            dispatch(clearImage());
          }}
        />
      </div>
    );
  }

  const handleImageClear = () => {
    if (selectedImage) {
      dispatch(clearImage());
      dispatch(
        showAlert({
          type: "info",
          message: "Image Remove successfully!",
        })
      );
    }else{
      dispatch(
        showAlert({
          type: "info",
          message: "Image Not selected!",
        })
      );
    }
  };
  return (
    <div className="relative">
      <CustomAlert />
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Upload An Image
        </h2>
        <ImageUploader />
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Submit
          </button>
          <button
            onClick={handleImageClear}
            className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
