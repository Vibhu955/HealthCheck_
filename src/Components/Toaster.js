// import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import '../Components/style.css';

function Toaster({showA, toggleShowA, result}) {
   
    return (
      <Col md={6} className="mb-2 m-4">
        <Toast className="mid" show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{result}</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{result? (result === 'Diabetic'? "You are Diabetic, But Don't Worry, follow the Medications!"
            : "You are not Diabetic, but keep Checking Here!") 
            : 'Please Fill all the Fields'}
          </Toast.Body>
        </Toast>
      </Col>
  );
}

export default Toaster;