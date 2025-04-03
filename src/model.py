from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import os
from preprocessing import load_data, preprocess_data

def train_model():
    """Train a Random Forest model and save it."""
    data = load_data("C:/Users/thinkBIG/Desktop/Student-Retention/data/train/dataset.csv")
    X_train, X_val, X_test, y_train, y_val, y_test = preprocess_data(data)

    # Train the model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"🎯 Model Accuracy: {accuracy * 100:.2f}%")
    print("\n📊 Classification Report:\n", classification_report(y_test, y_pred))
    print("\n📉 Confusion Matrix:\n", confusion_matrix(y_test, y_pred))

    # Save the trained model
    model_dir = "models"
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, "random_forest_model.pkl")
    joblib.dump(model, model_path)
    print(f"✅ Model saved at {model_path}")

if __name__ == "__main__":
    train_model()
