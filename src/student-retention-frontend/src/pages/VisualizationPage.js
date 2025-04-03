import React from "react";

const Visualization = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Visualizations</h1>

      {/* Screenshot for Feature Distribution */}
      <div className="w-full max-w-4xl mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Feature Distribution</h2>
        <img src="pages/metrix.png" className="w-full h-auto" />
        <p className="text-lg text-gray-700 mt-4">
          The feature distribution chart shows how the various features are spread across different values. These visualizations help to understand
          which features have the most variance or trends that might be important for model predictions.
        </p>
      </div>

      {/* Screenshot for Sales Over Time */}
      <div className="w-full max-w-4xl mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sales Over Time</h2>
        <img src="pages/assets/metrix.png" alt="Sales Over Time Chart" className="w-full h-auto" />
        <p className="text-lg text-gray-700 mt-4">
          The sales over time chart shows the trend of sales across months. This can help identify seasonal trends and sales growth, which can influence
          future sales predictions.
        </p>
      </div>

    </div>
  );
};

export default Visualization;
