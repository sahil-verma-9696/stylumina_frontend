import React, { useCallback } from "react";
import Recommendation from "./Recommendation";
import { useDispatch, useSelector } from "react-redux";
import FeedbackPopup from "./FeedbackPopup";
import { toggleFeedbackPopup } from "../store/slices/feedbackSlice";
import useFeedback from "../hooks/useFeedback";
import { Base_URL } from "../constants";

const ApiResponse = ({ onUploadAnotherImage }) => {
  const dispatch = useDispatch();
  const { preview } = useSelector((state) => state.image);
  const { toggleFeedback, feedback } = useSelector((state) => state.feedback);

  // Get the callApi function from the useFeedback hook
  const callApi = useFeedback();

  const handleFeedbackToggle = useCallback(() => {
    dispatch(toggleFeedbackPopup());
  }, [dispatch]);

  const handleFeedbackSubmit = useCallback(async () => {
    const baseUrl = Base_URL;
    const apiEndpoint = "/stylesense/api/feature_extraction/get_feedback/";

    try {
      await callApi(baseUrl + apiEndpoint, "POST", feedback);
    } catch (error) {
      console.error("Feedback submission failed:", error);
    }
  }, [callApi, feedback]);

  const renderFeatureRow = useCallback(
    (category, feature, index) => (
      <tr key={index} className="border-b">
        <td className="px-4 py-2">{feature.feature_name}</td>
        <td className="px-4 py-2">{feature.feature_value}</td>
        <td className="px-4 py-2">
          {(feature.confidence_score * 100).toFixed(2)}%
        </td>
        <td className="px-4 py-2">
          {toggleFeedback ? (
            <FeedbackPopup
              category={category}
              feature_name={feature.feature_name}
              feature_value={feature.feature_value}
            />
          ) : (
            <button
              className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              onClick={handleFeedbackToggle}
            >
              Feedback
            </button>
          )}
        </td>
      </tr>
    ),
    [toggleFeedback, handleFeedbackToggle]
  );

  const renderCategoryTable = useCallback(
    (category) => (
      <div key={category} className="mb-8">
        <h3 className="text-xl font-bold text-gray-700 mb-2">{category}</h3>
        <table className="w-full table-auto mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Feature Name</th>
              <th className="px-4 py-2 text-left">Feature Value</th>
              <th className="px-4 py-2 text-left">Confidence Score (%)</th>
              <th className="px-4 py-2 text-left">
                {toggleFeedback && (
                  <>
                    <button
                      className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={handleFeedbackToggle}
                    >
                      Close
                    </button>
                    <button
                      className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                      onClick={handleFeedbackSubmit}
                    >
                      Submit Feedback
                    </button>
                  </>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {feedback[category]?.map((feature, index) =>
              renderFeatureRow(category, feature, index)
            )}
          </tbody>
        </table>
      </div>
    ),
    [
      feedback,
      toggleFeedback,
      handleFeedbackToggle,
      handleFeedbackSubmit,
      renderFeatureRow,
    ]
  );

  return (
    <div className="size-full bg-gray-300">
      {/* Upload another image button */}
      <div className="text-center mt-4 fixed top-0 left-4">
        <button
          onClick={onUploadAnotherImage}
          className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-gray-100"
        >
          {"<-- "}Upload Another Image
        </button>
      </div>

      <div className="flex size-full justify-center items-center">
        {/* Right Side: Image */}
        <div className="w-[40%] h-full">
          <div className="w-fit h-[50%] m-auto mt-12" id="image-wrapper">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-full rounded-lg shadow-md"
              />
            )}
          </div>
          <Recommendation />
        </div>

        {/* Left Side: Tables for Each Category */}
        <div className="w-[60%] p-6 bg-white h-[100%] overflow-scroll">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Submission Successful
          </h2>
          {Object.keys(feedback)?.map(renderCategoryTable)}
        </div>
      </div>
    </div>
  );
};

export default ApiResponse;
