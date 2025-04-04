from fastapi import FastAPI, UploadFile, File
import joblib
import numpy as np
import pandas as pd
from pydantic import BaseModel, Field
from io import StringIO
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from fastapi.middleware.cors import CORSMiddleware
import os

# Feature names
FEATURE_NAMES = [
    "Age at enrollment", "Previous qualification", "Curricular units 1st sem (approved)",
    "Scholarship holder", "Debtor", "Gender", "Course"
]

# Ensure models directory exists
if not os.path.exists("models"):
    os.makedirs("models")

# Load model and scaler
def load_model():
    global model, scaler
    if os.path.exists("models/random_forest_model.pkl") and os.path.exists("models/scaler.pkl"):
        model = joblib.load("models/random_forest_model.pkl")
        scaler = joblib.load("models/scaler.pkl")
    else:
        model = None
        scaler = StandardScaler()
        print("Model not found. Please upload training data to /upload_data to train the model.")

# Initial model load
load_model()

# FastAPI instance
app = FastAPI(title="Student Retention Prediction API", version="1.0")

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input data structure
class InputData(BaseModel):
    Age_at_enrollment: int = Field(..., alias="Age at enrollment")
    Previous_qualification: int = Field(..., alias="Previous qualification")
    Curricular_units_1st_sem_approved: int = Field(..., alias="Curricular units 1st sem (approved)")
    Scholarship_holder: int = Field(..., alias="Scholarship holder")
    Debtor: int
    Gender: int
    Course: int

@app.get("/")
def home():
    return {"message": "Welcome to the Student Retention Prediction API!"}

@app.post("/predict")
def predict(data: InputData):
    if model is None:
        return {"error": "Model is not available. Please upload data to train the model."}

    # Convert input data to array
    input_features = np.array([[ 
        data.Age_at_enrollment,
        data.Previous_qualification,
        data.Curricular_units_1st_sem_approved,
        data.Scholarship_holder,
        data.Debtor,
        data.Gender,
        data.Course
    ]])

    # Scale input
    input_scaled = scaler.transform(input_features)

    # Predict
    prediction = model.predict(input_scaled)[0]

    # Map to label
    labels = {0: "Dropout", 1: "Graduate", 2: "Enrolled"}
    predicted_label = labels.get(prediction, "Unknown")

    return {"prediction": predicted_label}

@app.post("/upload_data")
async def upload_data(file: UploadFile = File(...)):
    # Read file
    content = await file.read()
    data = pd.read_csv(StringIO(content.decode("utf-8")))

    # Check columns
    for feature in FEATURE_NAMES:
        if feature not in data.columns:
            return {"error": f"Missing feature: {feature}"}
    if "Target" not in data.columns:
        return {"error": "Missing 'Target' column in uploaded CSV."}

    # Process data
    X = data[FEATURE_NAMES]
    y = data["Target"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    global model, scaler
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)

    # Save model and scaler
    joblib.dump(model, "models/random_forest_model.pkl")
    joblib.dump(scaler, "models/scaler.pkl")

    # Evaluate
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)

    return {"message": "Model retrained successfully", "accuracy": accuracy}

# Only runs locally, not on Render
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)
