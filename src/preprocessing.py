import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib
import os

# Define important features
SELECTED_FEATURES = [
    'Age at enrollment', 'Previous qualification', 'Curricular units 1st sem (approved)',
    'Scholarship holder', 'Debtor', 'Gender', 'Course'
]

def load_data(file_path):
    """Load dataset from a CSV file."""
    data = pd.read_csv(file_path)

    # Clean target column
    data['Target'] = data['Target'].astype(str).str.strip()
    data['Target'].fillna(data['Target'].mode()[0], inplace=True)
    data['Target'] = data['Target'].replace({'Graduate': 1, 'Dropout': 0, 'Enrolled': 2})

    return data

def preprocess_data(data):
    """Preprocess data: feature selection, split, and scaling."""
    X = data[SELECTED_FEATURES]
    y = data['Target']

    # Split into train, validation, and test sets
    X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42)
    X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

    # Standardize the data
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_val_scaled = scaler.transform(X_val)
    X_test_scaled = scaler.transform(X_test)

    # Save the scaler for future use
    model_dir = "models"
    os.makedirs(model_dir, exist_ok=True)
    scaler_path = os.path.join(model_dir, "scaler.pkl")
    joblib.dump(scaler, scaler_path)

    return X_train_scaled, X_val_scaled, X_test_scaled, y_train, y_val, y_test

if __name__ == "__main__":
    data = load_data("C:/Users/thinkBIG/Desktop/Student-Retention/data/train/dataset.csv")
    X_train, X_val, X_test, y_train, y_val, y_test = preprocess_data(data)
    print("✅ Data preprocessing complete!")
