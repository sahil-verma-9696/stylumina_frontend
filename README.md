``` js

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImage, setPreview, clearImage } from "../store/slices/imageSlice";

const ImageUploader = () => {
  const dispatch = useDispatch();
  const { selectedImage, preview } = useSelector((state) => state.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setImage(file));
        dispatch(setPreview(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setImage(file));
        dispatch(setPreview(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClear = () => {
    dispatch(clearImage());
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload An Image</h2>
      <div
        className={`border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 relative ${
          preview ? "p-0" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <p className="text-gray-500">
            Drag & drop an image, or <span className="text-indigo-600 font-semibold">browse</span>
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      {selectedImage && (
        <div className="mt-4">
          <p className="text-gray-600">
            <span className="font-semibold">File Name:</span> {selectedImage.name}
          </p>
          <button
            onClick={handleClear}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Clear Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
```