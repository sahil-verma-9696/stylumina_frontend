import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFeature,
  toggleChangeValue,
} from "../store/slices/feedbackSlice";

const FeedbackPopup = ({ category, feature_name, feature_value }) => {
  const { isChangeValue } = useSelector((state) => state.feedback);
  const dispatch = useDispatch();
  const handleRemoveFeature = () => {
    dispatch(removeFeature({ category, feature_name, feature_value }));
  };
  const handleChangeValue = () => {
    dispatch(toggleChangeValue());
  };
  return (
    <div className="w-full h-full bg-red-100 flex text-nowrap justify-center items-center gap-4">
      {isChangeValue ? (
        <>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-lg"
          />
          <div
            className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 cursor-pointer"
            onClick={handleRemoveFeature}
          >
            Submit Change
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
            Change Feature value
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackPopup;
