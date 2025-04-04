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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Predict Student Retention</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(inputData).map((fieldName) => (
            <div key={fieldName}>
              <label className="block font-semibold">{fieldLabels[fieldName]}</label>
              <input
                type="number"
                name={fieldName}
                value={inputData[fieldName]}
                onChange={handleChange}
                min={fieldName === "Gender" || fieldName === "Debtor" || fieldName === "Scholarship holder" ? 0 : undefined}
                max={fieldName === "Gender" || fieldName === "Debtor" || fieldName === "Scholarship holder" ? 1 : undefined}
                className="p-3 text-lg border border-gray-300 w-full rounded-md"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-600 text-white p-4 text-lg w-full rounded-md font-semibold mt-4 hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
            <p>{error}</p>
          </div>
        )}

        {prediction !== null && !error && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md text-center">
            <h2 className="text-2xl font-bold">Prediction Result</h2>
            <p className="text-xl mt-2">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictPage;