import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearImage, showAlert } from "../store/slices/imageSlice";
import useApiCall from "../hooks/useApiCall";
import CustomAlert from "../components/CustomAlert";
import ShimmerEffect from "../components/ShimmerEffect";
import ImageUploader from "../components/ImageUploader";
import ApiResponse from "../components/ApiResponse";  // Import the new component

const MainPage = () => {
  const dispatch = useDispatch();
  const callApi = useApiCall();
  const { selectedImage, base64 } = useSelector((state) => state.image);
  const [isLoading, setIsLoading] = useState(false); // To handle shimmer
  const [apiResponse, setApiResponse] = useState(null); // To display API response

  const handleSubmit = async () => {
    if (!selectedImage) {
      dispatch(showAlert({ type: "error", message: "Please upload an image first!" }));
      return;
    }

    try {
      setIsLoading(true); // Start shimmer effect
      const response = await callApi("http://localhost:5000/api/upload", "POST", { image: base64 });
      setApiResponse(response); // Store API response
      dispatch(showAlert({ type: "success", message: "Image uploaded successfully!" }));
      dispatch(clearImage());
    } catch (error) {
      // Error handled in the custom hook
    } finally {
      setIsLoading(false); // Stop shimmer effect
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
          onUploadAnotherImage={() => setApiResponse(null)} 
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <CustomAlert />
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload An Image</h2>
        <ImageUploader />
        <button
          onClick={handleSubmit}
          className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MainPage;
