from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel

# Load model and scaler
model = joblib.load("models/random_forest_model.pkl")
scaler = joblib.load("models/scaler.pkl")

# Feature names
FEATURE_NAMES = [
    "Age at enrollment", "Previous qualification", "Curricular units 1st sem (approved)",
    "Scholarship holder", "Debtor", "Gender", "Course"
]

# FastAPI instance
app = FastAPI(title="Student Retention Prediction API", version="1.0")

# Define input data structure
class InputData(BaseModel):
    Age_at_enrollment: int
    Previous_qualification: int
    Curricular_units_1st_sem_approved: int
    Scholarship_holder: int
    Debtor: int
    Gender: int
    Course: int

@app.get("/")
def home():
    return {"message": "Welcome to the Student Retention Prediction API!"}

@app.post("/predict")
def predict(data: InputData):
    # Convert input data to list
    input_features = np.array([[
        data.Age_at_enrollment, data.Previous_qualification,
        data.Curricular_units_1st_sem_approved, data.Scholarship_holder,
        data.Debtor, data.Gender, data.Course
    ]])

    # Scale input
    input_scaled = scaler.transform(input_features)

    # Make prediction
    prediction = model.predict(input_scaled)[0]

    # Map prediction to label
    labels = {0: "Dropout", 1: "Graduate", 2: "Enrolled"}
    predicted_label = labels.get(prediction, "Unknown")

    return {"prediction": predicted_label}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
