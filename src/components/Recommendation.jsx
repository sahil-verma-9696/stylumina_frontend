import React from "react";
import { useSelector } from "react-redux";

const Recommendation = () => {
  const { related_product } = useSelector((store) => store.features);

  return (
    <div className="w-full mt-4 h-[400px] overflow-y-auto">
      <h1 className="text-lg font-bold mb-4">Recommendation</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {related_product?.map((product, index) => (
          <div
            key={index}
            className="w-full h-[150px] bg-white shadow-md rounded-lg overflow-hidden"
          >
            {
              product && <img
                src={product}
                alt={product || "product " + index}
                className="w-full h-full object-cover"
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
