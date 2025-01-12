import React from "react";
import Recommendation from "./Recommendation";
import { useDispatch, useSelector } from "react-redux";
import FeedbackPopup from "./FeedbackPopup";
import {
  setFeedback,
  toggleFeedbackPopup,
} from "../store/slices/feedbackSlice";

const ApiResponse = ({ onUploadAnotherImage }) => {
  const dispatch = useDispatch();

  const { preview } = useSelector((state) => state?.image);
  const { toggleFeedback, feedback } = useSelector((state) => state.feedback);

  const handleFeedbackToggle = () => {
    dispatch(toggleFeedbackPopup());
  };
  const handleFeedbackSubmit = () => {};

  console.log(toggleFeedback);
  return (
    <div className="size-full bg-gray-300">
      {/* Upload another image button */}
      <div className="text-center mt-4 fixed top-[0px] left-4">
        <button
          onClick={onUploadAnotherImage}
          className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-gray-100"
        >
          {"<-- "}Upload Another Image
        </button>
      </div>

      <div className="flex size-full   justify-center items-center">
        {/* Left Side: Table */}
        <div className="w-1/2 p-6 bg-white h-[100%] overflow-scroll">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Submission Successful
          </h2>

          {/* Table for displaying feature data */}
          {/* <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Feature Name</th>
                <th className="px-4 py-2 text-left">Feature Value</th>
                <th className="px-4 py-2 text-left">Confidence Score (%)</th>
                <th className="px-4 py-2 text-left">
                  {toggleFeedback ? (
                    <>
                      <div
                        className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer text-center"
                        onClick={handleFeedbackToggle}
                      >
                        Close
                      </div>
                      <div
                        className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer text-center"
                        onClick={handleFeedbackSubmit}
                      >
                        Submit Feedback
                      </div>
                    </>
                  ) : (
                    "Feedback"
                  )}
                </th>
              </tr>
            </thead>

            <tbody>
              {feedback[Object.keys(feedback)[0]]?.map((feature, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{feature.feature_name}</td>
                  <td className="px-4 py-2">{feature.feature_value}</td>
                  <td className="px-4 py-2">
                    {(feature.confidence_score * 100).toFixed(2)}%
                  </td>
                  <td className="px-4 py-2">
                    {toggleFeedback ? (
                      <FeedbackPopup
                        category={Object.keys(feedback)[0]}
                        feature_name={feature.feature_name}
                        feature_value={feature.feature_value}
                      />
                    ) : (
                      <div
                        className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer"
                        onClick={handleFeedbackToggle}
                      >
                        Feedback
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>

        {/* Right Side: Image */}
        <div className="w-1/2 h-full">
          <div className="w-fit h-[50%] m-auto mt-12" id="image-wrapper">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-full rounded-lg shadow-md"
              />
            ) : null}

            <Recommendation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiResponse;
