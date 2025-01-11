// components/ApiResponse.js

import React, { useState } from "react";

const ApiResponse = ({ apiResponse, onUploadAnotherImage }) => {
  const [feedback, setFeedback] = useState({}); // To store feedback for each feature

  // Destructure the watches from the API response
  const watches = apiResponse.feature_data.Watches;

  // Handle feedback submission
  const handleFeedback = (featureName, feedbackText) => {
    setFeedback({
      ...feedback,
      [featureName]: feedbackText,
    });
    alert(`Feedback for ${featureName} submitted: ${feedbackText}`);
  };

  return (
    <>
      <div className="flex">
        {/* Left Side: Table */}
        <div className="w-1/2 p-6 bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Submission Successful
          </h2>

          {/* Table for displaying feature data */}
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Feature Name</th>
                <th className="px-4 py-2 text-left">Feature Value</th>
                <th className="px-4 py-2 text-left">Confidence Score (%)</th>
                <th className="px-4 py-2 text-left">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {watches.map((watch, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{watch.feature_name}</td>
                  <td className="px-4 py-2">{watch.feature_value}</td>
                  <td className="px-4 py-2">
                    {(watch.confidence_score * 100).toFixed(2)}%
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      className="px-2 py-1 border rounded"
                      placeholder="Enter feedback"
                      onBlur={(e) =>
                        handleFeedback(watch.feature_name, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side: Image */}
        <div className="w-1/2 p-6 bg-gray-100 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/300" // Replace with your image URL
            alt="Uploaded Image"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Upload another image button */}
      <div className="text-center mt-4">
        <button
          onClick={onUploadAnotherImage}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
        >
          Upload Another Image
        </button>
      </div>
    </>
  );
};

export default ApiResponse;
