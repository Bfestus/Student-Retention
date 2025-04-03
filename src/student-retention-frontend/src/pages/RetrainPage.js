import React, { useState } from "react";
import axios from "axios";

const RetrainPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://student-retention-1.onrender.com/upload_data", 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(`Model retrained successfully! Accuracy: ${response.data.accuracy}`);
    } catch (error) {
      console.error("Error retraining model", error);
      setMessage("Error retraining the model.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Retrain Model</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 mb-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 mt-4">
          Upload Data and Retrain
        </button>
      </form>
      {message && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{message}</h2>
        </div>
      )}
    </div>
  );
};

export default RetrainPage;
