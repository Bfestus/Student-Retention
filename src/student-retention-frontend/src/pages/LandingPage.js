import React from "react";
import { Link } from "react-router-dom";
import studentPredictionImage from "./student-prediction.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-8 font-serif">
        Welcome to the Student Retention Prediction System
      </h1>
      
      <div className="flex flex-col md:flex-row-reverse items-center justify-between max-w-6xl w-full">
        {/* Description text on the right */}
        <div className="md:w-1/2 md:pl-8 mb-6 md:mb-0">
          <p className="text-xl text-gray-800 leading-relaxed font-sans">
            This project predicts student retention outcomes (whether a student is likely to 
            <span className="font-semibold"> Graduate, Dropout, or Enrolled</span> based on input features such as age, 
            previous qualification, curricular units passed, and more.
          </p>
          <p className="mt-4 text-xl text-gray-800 leading-relaxed font-sans">
            The model is powered by machine learning and is accessible through a REST API
            built using FastAPI. The front-end is built with React and provides an interactive 
            interface for making predictions and retraining the model.
          </p>
          <div className="mt-8">
            <Link
              to="/predict"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-medium shadow-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
        
        {/* Smaller image on the left */}
        <div className="md:w-2/5 flex justify-center">
          <img
            src={studentPredictionImage}
            alt="Student Prediction"
            className="w-3/4 rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;