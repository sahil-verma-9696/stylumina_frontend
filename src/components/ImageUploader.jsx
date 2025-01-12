import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setImage,
  setPreview,
  showAlert,
  clearAlert,
} from "../store/slices/imageSlice";

const ImageUploader = () => {
  const dispatch = useDispatch();
  const { preview, isLoading } = useSelector((state) => state.image);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        dispatch(setImage({ image: file, base64: base64String }));
        dispatch(setPreview(base64String));
        dispatch(
          showAlert({
            type: "success",
            message: "Image uploaded successfully!",
          })
        );

        setTimeout(() => dispatch(clearAlert()), 3000); // Clear alert after 3 seconds
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div
        className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition"
        onClick={() => document.getElementById("fileInput").click()}
      >
        {isLoading ? (
          <div className="animate-pulse h-24 bg-gray-300"></div>
        ) : preview ? (
          <img src={preview} alt="Preview" className="max-w-full h-auto" />
        ) : (
          <p>Click to select an image</p>
        )}
      </div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUploader;
