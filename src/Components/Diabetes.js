import React, { useState , useContext} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Toaster from './Toaster';
import '../Components/style.css';
import PhysicsContext from '../contextApis/physicalcheck/physicalContext';


/* eslint-disable no-unused-vars */
function Diabetes() {
    const {details,  updateDiabetes, result, setResult } = useContext(PhysicsContext);
    const history = useHistory();
    const [data, setdata] = useState(({}))
    const [showA, setShowA] = useState(true);
    const [open, setOpen] = useState(false); //Toast
    const [userIp, setUserIp] = useState({ Gender: "", Age: "", HyperTension: "", Heart_Disease: "", Smoking_History: "", BMI: "", HbA1c_level: "", Blood_Glucose_level: "" });


    const fetchData= async()=>{
        const response = (await axios.post(`${process.env.REACT_APP_BACKEND_URL}/prediction`
            , userIp,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }))
        // setdata(response.data)
        setResult(response.data.result)
        // console.log(response.data.result)
        return response.data.result;
    }
   
    const toggleShowA = (() => {
        setShowA(!showA)
    });
    const onClickSubmit = async (e) => {
        if (Object.values(userIp).some(value => value === "")) {
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
                history.push('/physical/diabetes');
            }, 3000);

        }
        else {
            let res=await fetchData();
            setTimeout(() => {
                console.log(res)
                if(details[0].user)
                    updateDiabetes(details[0].user,res);
        }, 4000);
            //Toast
            setOpen(true);
            setTimeout(() => {
                toggleShowA();
            }, 1500);

            setTimeout(() => {
                setOpen(false);
                history.push('/physical');
            }, 3000);
            // console.log(e.target)
        }
    }
    // const handleShowToast = () => {
    //     setOpen(true); // Open toast
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    const onHandleChange = ((e) => {
        e.preventDefault();
        setUserIp({ ...userIp, [e.target.name]: e.target.value })
    })
    // console.log(userIp);
    return (
        <div>
            {/* gender	age	hypertension	heart_disease	smoking_history	bmi	HbA1c_level	blood_glucose_level */}
            <div className='container my-4 p-3 border'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Gender</label>
                    <input type="number" className="form-control" name="Gender" value={userIp.Gender} id="exampleFormControlInput1" placeholder="1-M or 0-F" onChange={onHandleChange} min={0} max={1} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Age</label>
                    <input type="number" className="form-control" id="exampleFormControlInput2" name="Age" value={userIp.Age} placeholder="age" step={0.01} onChange={onHandleChange} min={0.08} max={80} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput3" className="form-label">Hypertension</label>
                    <input type="number" className="form-control" id="exampleFormControlInput3" name="HyperTension" value={userIp.HyperTension} placeholder="1-Yes or 0-No" onChange={onHandleChange} min={0} max={1} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput4" className="form-label">Heart Disease</label>
                    <input type="number" className="form-control" id="exampleFormControlInput4" name="Heart_Disease" value={userIp.Heart_Disease} placeholder="1-Yes or 0-No" onChange={onHandleChange} min={0} max={1} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlSelect5" className="form-label">Smokin History</label>
                    <select className="form-select" id="exampleFormControlSelect5" name="Smoking_History" value={userIp.Smoking_History} onChange={onHandleChange}>
                        <option value="" disabled>Select an Option</option>
                        <option value="5">Not current</option>
                        <option value="3">Former</option>
                        <option value="0">No Info</option>
                        <option value="1">Current</option>
                        <option value="2">Ever</option>
                        <option value="4">Never</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput6" className="form-label">BMI</label>
                    <input type="number" className="form-control" id="exampleFormControlInput6" placeholder="Enter Calculated BMI" name="BMI" value={userIp.BMI} step={0.01} onChange={onHandleChange} min={10} max={95.7} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput7" className="form-label">HbA1c_level</label>
                    <input type="number" className="form-control" id="exampleFormControlInput7" placeholder="Level" name="HbA1c_level" value={userIp.HbA1c_level} step={0.01} onChange={onHandleChange} min={3.5} max={9} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput8" className="form-label">blood_glucose_level</label>
                    <input type="number" className="form-control" id="exampleFormControlInput8" placeholder="Level" name="Blood_Glucose_level" value={userIp.Blood_Glucose_level} step={0.01} onChange={onHandleChange} min={80} max={300} />
                </div>
                <button type="button" className="btn btn-primary" onClick={onClickSubmit}  >Submit Report</button>
                {/* {data ? <h6>{data.result}</h6> : ""} */}
            </div>
            <div className={open ? 'toasting' : 'close'}>
                {open ? <Toaster toggleShowA={toggleShowA} showA={showA} result={result} /> : ""}
            </div>
        </div>
    );
}
export default Diabetes;