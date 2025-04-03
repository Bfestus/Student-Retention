import joblib
import numpy as np
import os
import pandas as pd

# Define feature names
FEATURE_NAMES = [
    'Age at enrollment', 'Previous qualification', 'Curricular units 1st sem (approved)',
    'Scholarship holder', 'Debtor', 'Gender', 'Course'
]

def load_model():
    """Load the trained model and scaler."""
    model_path = os.path.join("models", "random_forest_model.pkl")
    scaler_path = os.path.join("models", "scaler.pkl")

    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)

    return model, scaler

def predict(input_dict):
    """Predict the class of new data from a dictionary of feature values."""
    model, scaler = load_model()

    # Convert dictionary to DataFrame
    input_df = pd.DataFrame([input_dict])

    # Ensure feature order matches training data
    input_df = input_df[FEATURE_NAMES]

    # Scale input
    input_scaled = scaler.transform(input_df)

    # Make prediction
    prediction = model.predict(input_scaled)
    return prediction[0]

if __name__ == "__main__":
    # Example input with named features
    sample_input = {
        "Age at enrollment": 45,
        "Previous qualification": 12,
        "Curricular units 1st sem (approved)": 5,
        "Scholarship holder": 0,
        "Debtor": 1,
        "Gender": 0,
        "Course": 3
    }
    
    prediction = predict(sample_input)
    print(f"🎯 Predicted Class: {prediction}")
