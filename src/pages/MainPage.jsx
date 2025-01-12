import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearImage } from "../store/slices/imageSlice";
import useApiCall from "../hooks/useApiCall";
import CustomAlert from "../components/CustomAlert";
import ShimmerEffect from "../components/ShimmerEffect";
import ImageUploader from "../components/ImageUploader";
import ApiResponse from "../components/ApiResponse";
import { setFeedback } from "../store/slices/feedbackSlice";
import { showAlert } from "../store/slices/alertSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const callApi = useApiCall();
  const [showResponse, setShowResponse] = React.useState(false);

  const { selectedImage, base64 } = useSelector((state) => state.image);

  const handleSubmit = async () => {
    if (!selectedImage) {
      dispatch(
        showAlert({ type: "error", message: "Please upload an image first!" })
      );
      return;
    }

    try {
      setShowResponse(true);
      const base_url = "https://84e8-27-6-193-65.ngrok-free.app";
      const api = "/stylesense/api/feature_extraction/extract_features/";

      await callApi(base_url + api, "POST", {
        prod_img_bin_data: base64.split(",")[1],
        description: "Image uploaded by the user",
      });
    } catch (error) {
      dispatch(showAlert({ type: "error", message: error.message }));
    } finally {
      // setLoading(false); // Stop shimmer effect
    }
  };

  const handleImageClear = () => {
    if (selectedImage) {
      dispatch(clearImage());
      dispatch(
        showAlert({
          type: "info",
          message: "Image Remove successfully!",
        })
      );
    } else {
      dispatch(
        showAlert({
          type: "info",
          message: "Image Not selected!",
        })
      );
    }
  };

  if (showResponse) {
    return (
      <div className="relative size-full">
        <CustomAlert />
        <ApiResponse
          apiResponse={{}}
          onUploadAnotherImage={() => {
            dispatch(clearImage());
            setShowResponse(false);
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

        <ImageUploader />

        {/* buttons submit and clear */}
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
