import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to the Student Retention Prediction System
      </h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl">
        This project predicts student retention outcomes (whether a student is
        likely to Graduate, Dropout, or Enrolled) based on input features such
        as age, previous qualification, curricular units passed, and more. The
        model is powered by machine learning and is accessible through a REST API
        built using FastAPI. The front-end is built with React and provides an
        interactive interface for making predictions and retraining the model.
      </p>
      <img
        src="/pages/assets/student-prediction.png"
        alt="Student Prediction"
        className="mt-6 w-3/4 max-w-lg rounded-lg shadow-lg"
      />
      <div className="mt-6">
        <Link
          to="/predict"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
