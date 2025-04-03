from fastapi import FastAPI, UploadFile, File
import joblib
import numpy as np
import pandas as pd
from pydantic import BaseModel
from io import StringIO
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

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

@app.post("/upload_data")
async def upload_data(file: UploadFile = File(...)):
    # Read file content
    file_content = await file.read()

    # Convert to a pandas DataFrame
    data = pd.read_csv(StringIO(file_content.decode("utf-8")))

    # Check if necessary features are in the uploaded data
    for feature in FEATURE_NAMES:
        if feature not in data.columns:
            return {"error": f"Missing feature: {feature}"}

    # Preprocess the data
    X = data[FEATURE_NAMES]
    y = data['Target']

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Standardize the data
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Retrain the model with new data
    global model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)

    # Save the retrained model
    joblib.dump(model, "models/random_forest_model.pkl")

    # Evaluate the model
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)

    # Save the scaler after retraining (if necessary)
    joblib.dump(scaler, "models/scaler.pkl")

    return {"message": "Model retrained successfully", "accuracy": accuracy}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
