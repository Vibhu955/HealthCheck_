import  pickle
import numpy as np
from flask import Flask, jsonify,render_template,request
from flask_cors import CORS
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__) #Flask object instantiation
cors = CORS(app, resources={
    r"/*": {
        "origins": [
            os.getenv('FRONTEND_HOST'),
            "https://vibhu955.github.io/HealthCheck_"
        ],
        "supports_credentials": True
    }
})

model= pickle.load(open('Backendpy/model2.pkl','rb'))
# # scaler = pickle.load(open('Backendpy/scaler.pkl', 'rb'))  # Ensure you save and load the scaler correctly
encoders = pickle.load(open('Backendpy/encoders.pkl', 'rb'))

le_gender = encoders["gender"]
le_smoking = encoders["smoking_history"]

    
print("Diabetes Model Loaded")

@app.route('/')
def home():
    return ('Helllo World!')
    # return render_template('index2.html')

@app.route('/prediction', methods=['POST'])
def Pred():
    data = request.get_json()

    required_features = ['Gender', 'Age', 'HyperTension', 'Heart_Disease', 'Smoking_History', 'BMI', 'HbA1c_level', 'Blood_Glucose_level']
    missing_features = [feature for feature in required_features if feature not in data]
    if missing_features:
        return jsonify({"error": f"Missing required features: {missing_features}"}), 400

    try:
        # Convert to correct types
        gender = int(data['Gender'])
        age = float(data['Age'])
        hypertension = int(data['HyperTension'])
        heart_disease = int(data['Heart_Disease'])
        smoking_history = int(data['Smoking_History'])
        bmi = float(data['BMI'])
        hba1c = float(data['HbA1c_level'])
        glucose = float(data['Blood_Glucose_level'])

        input_array = np.array([[gender, age, hypertension, heart_disease, smoking_history, bmi, hba1c, glucose]])

        prediction = model.predict(input_array)

        if(prediction[0]==0):
            return jsonify({"result":'Non-Diabetic'}),200
        else:
            return jsonify({"result":'Diabetic'}),200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__=='__main__':
    app.run(debug=True)
# Install python-dotenv