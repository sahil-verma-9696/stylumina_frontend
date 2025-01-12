import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFeatureValue,
  removeFeature,
  toggleChangeValue,
} from "../store/slices/feedbackSlice";

const FeedbackPopup = ({ category, feature_name, feature_value }) => {
  const { isChangeValue } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  
  // State to manage the new feature value input
  const [newValue, setNewValue] = useState(feature_value);

  const handleRemoveFeature = () => {
    dispatch(removeFeature({ category, feature_name, feature_value }));
  };
  
  const handleChangeValue = () => {
    dispatch(toggleChangeValue());
  };
  
  const handleSubmitChange = () => {
    dispatch(
      changeFeatureValue({ category, feature_name, new_value: newValue })
    );
    setNewValue(''); // Clear input after submission
  };

  const handleCancelChange = () => {
    setNewValue(feature_value); // Reset to the original feature value
    dispatch(toggleChangeValue()); // Switch back to the default state
  };

  // stylesense/api/feature_extraction/get_feedback/

  // vcg16
// resnet
// vit
// cv model
// roberta
// nlp model
// nltk

  return (
    <div className="w-full h-full bg-red-100 flex text-nowrap justify-center items-center gap-4">
      {isChangeValue ? (
        <>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)} // Update state on input change
            className="border border-gray-300 p-2 rounded-lg"
            placeholder="Enter new value"
          />
          <div
            className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer"
            onClick={handleSubmitChange}
          >
            Submit Change
          </div>
          <div
            className="w-full mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
            onClick={handleCancelChange}
          >
            Cancel Change
          </div>
        </>
      ) : (
        <div>
          <div
            className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
            onClick={handleRemoveFeature}
          >
            Remove Feature
          </div>
          <div
            className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer"
            onClick={handleChangeValue}
          >
            Change Feature Value
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPopup;
