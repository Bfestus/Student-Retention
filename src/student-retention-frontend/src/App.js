import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import PredictionPage from "./pages/PredictionPage";
import RetrainPage from "./pages/RetrainPage";
import VisualizationPage from "./pages/VisualizationPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict" element={<PredictionPage />} />
          <Route path="/retrain" element={<RetrainPage />} />
          <Route path="/visualize" element={<VisualizationPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
