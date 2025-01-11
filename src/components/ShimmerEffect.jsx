import React from "react";

const ShimmerEffect = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ShimmerEffect;
