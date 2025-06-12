import  pickle
import numpy as np
from flask import Flask, jsonify,render_template,request
from flask_cors import CORS
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__) #Flask object instantiation
cors= CORS(app, origins=[os.getenv('FRONTEND_HOST')]) #CORS object instantiation

model= pickle.load(open('Backendpy/model2.pkl','rb'))
scaler = pickle.load(open('Backendpy/scaler.pkl', 'rb'))  # Ensure you save and load the scaler correctly
print("Diabetes Model Loaded")

@app.route('/')
def home():
    return ('Helllo World!')
    # return render_template('index2.html')

@app.route('/prediction',methods=['POST'])
def Pred():
    # prediction=model.predict([[1,28.0,0,0,4,27.32,5.7,158]])
    data=request.get_json()
    # print(data)
    
    required_features = ['Gender', 'Age', 'HyperTension', 'Heart_Disease', 'Smoking_History', 'BMI', 'HbA1c_level', 'Blood_Glucose_level']
    missing_features = [feature for feature in required_features if feature not in data]
    if missing_features:
        return jsonify({"error": f"Missing required features: {missing_features}"}), 400
    # data=req_data.get(data['Gender'],...)
    
    input_array = np.array([data[feature] for feature in data]).reshape(1, -1)
    input_std = scaler.transform(input_array)
    # print(input_array)
    prediction = model.predict(input_std)

    # prediction=model.predict([[(value) for key,value in data.items()]])
    print(prediction)
    if(prediction[0]==0):
        return jsonify({"result":'Non-Diabetic'}),200
    else:
        return jsonify({"result":'Diabetic'}),200

if __name__=='__main__':
    app.run(debug=True)
# Install python-dotenv