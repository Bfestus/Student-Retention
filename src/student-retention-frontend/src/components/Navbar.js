import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Add this CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Student Retention</h1>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul className={isOpen ? "nav-links open" : "nav-links"}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/predict">Predict</Link></li>
          <li><Link to="/retrain">Retrain</Link></li>
          <li><Link to="/visualize">Visualizations</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
