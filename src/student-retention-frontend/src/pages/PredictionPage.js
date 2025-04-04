import React, { useState } from "react";
import axios from "axios";

const PredictPage = () => {
  const [inputData, setInputData] = useState({
    "Age at enrollment": "",
    "Previous qualification": "",
    "Curricular units 1st sem (approved)": "",
    "Scholarship holder": "",
    "Debtor": "",
    "Gender": "",
    "Course": "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    
    try {
      // Convert all values to numbers before sending
      const numericData = {};
      for (const key in inputData) {
        numericData[key] = inputData[key] === "" ? "" : Number(inputData[key]);
      }
      
      console.log("Sending data:", numericData); // Console log only - won't show on screen
      
      const response = await axios.post(
        "https://student-retention-2.onrender.com/predict",
        numericData,
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000
        }
      );
      
      console.log("API Response:", response); // Console log only - won't show on screen
      
      if (response.data) {
        // Handle different response formats
        if (typeof response.data === 'string') {
          setPrediction(response.data);
        } else if (response.data.prediction !== undefined) {
          setPrediction(response.data.prediction);
        } else if (response.data.result !== undefined) {
          setPrediction(response.data.result);
        } else {
          setPrediction(JSON.stringify(response.data));
        }
      } else {
        setError("No prediction available");
      }
    } catch (error) {
      console.error("Error making prediction:", error);
      setError("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Field name mapping for display purposes
  const fieldLabels = {
    "Age at enrollment": "Age at Enrollment",
    "Previous qualification": "Previous Qualification (Numerical)",
    "Curricular units 1st sem (approved)": "Curricular Units (1st Sem Approved)",
    "Scholarship holder": "Scholarship Holder (0=No, 1=Yes)",
    "Debtor": "Debtor (0=No, 1=Yes)",
    "Gender": "Gender (0=Female, 1=Male)",
    "Course": "Course (Numerical Code)"
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="bg-white p-8 shadow-2xl rounded-2xl w-full max-w-2xl border border-blue-100 transform transition-all">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Student Retention Predictor</h1>
          <p className="text-slate-600">Enter student information to predict retention outcome</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {Object.keys(inputData).map((fieldName) => (
              <div key={fieldName} className="transition-all duration-300 hover:shadow-md p-4 rounded-lg border border-gray-200">
                <label className="block font-semibold text-gray-700 mb-2">{fieldLabels[fieldName]}</label>
                <input
                  type="number"
                  name={fieldName}
                  value={inputData[fieldName]}
                  onChange={handleChange}
                  min={fieldName === "Gender" || fieldName === "Debtor" || fieldName === "Scholarship holder" ? 0 : undefined}
                  max={fieldName === "Gender" || fieldName === "Debtor" || fieldName === "Scholarship holder" ? 1 : undefined}
                  className="p-3 text-lg border border-gray-300 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                  placeholder="Enter value"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-4 text-lg w-full rounded-lg font-semibold mt-8 hover:bg-blue-700 transition-colors disabled:bg-blue-400 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Predict Retention"
            )}
          </button>
        </form>

        {error && (
          <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-center animate-pulse">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {prediction !== null && !error && (
          <div className="mt-8 p-6 bg-green-50 border-l-4 border-green-500 text-green-800 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Prediction Result</h2>
            <div className="p-4 bg-white rounded-lg shadow-inner text-3xl font-bold text-blue-800">
              {prediction}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictPage;