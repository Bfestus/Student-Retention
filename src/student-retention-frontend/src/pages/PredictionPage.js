import React, { useState } from "react";
import axios from "axios";

const PredictPage = () => {
  const [inputData, setInputData] = useState({
    Age_at_enrollment: "",
    Previous_qualification: "",
    Curricular_units_1st_sem_approved: "",
    Scholarship_holder: "",
    Debtor: "",
    Gender: "",
    Course: "",
  });

  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        inputData
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error(
        "Error making prediction",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-xl rounded-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Predict Student Retention</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Age at Enrollment</label>
            <input
              type="number"
              name="Age_at_enrollment"
              value={inputData.Age_at_enrollment}
              onChange={handleChange}
              className="p-3 text-lg border border-gray-300 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Previous Qualification</label>
            <input
              type="number"
              name="Previous_qualification"
              value={inputData.Previous_qualification}
              onChange={handleChange}
              className="p-3 text-lg border border-gray-300 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Curricular Units (1st Sem Approved)</label>
            <input
              type="number"
              name="Curricular_units_1st_sem_approved"
              value={inputData.Curricular_units_1st_sem_approved}
              onChange={handleChange}
              className="p-3 text-lg border border-gray-300 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Scholarship Holder (Yes/No)</label>
            <input
              type="text"
              name="Scholarship_holder"
              value={inputData.Scholarship_holder}
              onChange={handleChange}
              className="p-3 text-lg border border-gray-300 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Debtor (Yes/No)</label>
            <input
              type="text"
              name="Debtor"
              value={inputData.Debtor}
              onChange={handleChange}
              className="p-3 text-lg border border-gray-300 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Gender (Male/Female)</label>
            <input
              type="text"
              name="Gender"
              value={inputData.Gender}
              onChange={handleChange}
              className="p-3 text-lg border border-gray-300 w-full rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Course</label>
            <input
              type="text"
              name="Course"
              value={inputData.Course}
              onChange={handleChange}
              className="p-3 text-lg border border-gray-300 w-full rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-4 text-lg w-full rounded-md font-semibold mt-4"
          >
            Predict
          </button>
        </form>

        {prediction && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold">Prediction: {prediction}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictPage;
