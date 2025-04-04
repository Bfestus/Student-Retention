### Link to video: https://youtu.be/vySGtYdLds8
### Link to API cloud: https://student-retention-2.onrender.com
### Link to website: 


# Student Retention Prediction System

## Project Overview
This project predicts student retention outcomes (whether a student is likely to Graduate, Dropout, or Enrolled) based on input features such as age, previous qualification, curricular units passed, and more. The model is powered by machine learning and is accessible through a REST API built using FastAPI. The front-end is built with React and provides an interactive interface for making predictions and retraining the model.

## Prerequisites
Ensure you have the following installed:
- **Node.js** (for running React)
- **npm** (for managing frontend dependencies)
- **Python 3.x** (for running the backend)
- **pip** (for managing Python dependencies)

## Installation and Setup

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/student-retention-prediction.git
```

### 2. Install Frontend Dependencies
Navigate to the frontend directory and install the required dependencies:
```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies
Navigate to the backend directory and install the required Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### 4. Run the Backend
Start the FastAPI server for the backend:
```bash
uvicorn main:app --reload
```
The API will be available at http://127.0.0.1:8000.

### 5. Run the Frontend
Navigate to the frontend directory and start the React development server:
```bash
npm start
```
The frontend will be available at http://localhost:3000.

## API Endpoints

### 1. `/predict` (POST)
This endpoint accepts input data to predict student retention.

**Request Body:**
```json
{
  "Age_at_enrollment": 20,
  "Previous_qualification": 2,
  "Curricular_units_1st_sem_approved": 5,
  "Scholarship_holder": 1,
  "Debtor": 0,
  "Gender": 1,
  "Course": 3
}
```

**Response:**
```json
{
  "prediction": "Graduate"
}
```




