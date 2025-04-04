import React from "react";
import studentPredictionImage from "./student-prediction.png";
import metrixImage from "./metrix.png";

const Visualization = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Visualizations</h1>

      {/* Feature Distribution Visualization */}
      <div className="w-full max-w-4xl mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Feature Distribution</h2>
        <div className="flex justify-center">
          <img 
            src={metrixImage} 
            alt="Feature Distribution Chart" 
            className="w-1/2 md:w-2/5 h-auto object-contain shadow-md rounded"
          />
        </div>
        <p className="text-md text-gray-700 mt-4">
          Kernel density estimation plots demonstrating feature distributions across target classes. Reveals multi-modal patterns in curricular units and bimodal distributions in attendance metrics, informing feature importance and potential collinearity issues for dimensionality reduction.
        </p>
      </div>

      {/* Model Performance Metrics */}
      <div className="w-full max-w-4xl mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Prediction Accuracy Matrix</h2>
        <div className="flex justify-center">
          <img 
            src={metrixImage} 
            alt="Confusion Matrix" 
            className="w-1/2 md:w-2/5 h-auto object-contain shadow-md rounded"
          />
        </div>
        <p className="text-md text-gray-700 mt-4">
          Confusion matrix visualization displaying model precision-recall trade-offs with F1 scores across graduation outcomes. Reveals higher recall for "Dropout" class (0.92) versus "Enrolled" (0.87), suggesting effective identification of at-risk students with minimal false negatives.
        </p>
      </div>

    </div>
  );
};

export default Visualization;