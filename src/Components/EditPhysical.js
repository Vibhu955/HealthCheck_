import { useContext, useState } from 'react'
import PhysicsContext from '../contextApis/physicalcheck/physicalContext'
import { useHistory } from 'react-router-dom';

function EditPhysical(props) {
    // const { alldetails, details, Details, addphysical, error, editDetails, user } = useContext(PhysicsContext);
    const { alldetails, details, error, editDetails } = useContext(PhysicsContext);

    const history = useHistory();
    // let { detail, setdetail } = props;
    const [detail, setdetail] = useState({ height: "", weight: "", bmi: "" });

    const OnClick = ((e) => {
        e.preventDefault();
        console.log(details);

        if (!(detail.height || detail.weight))
            alert("Error, Cant Update details")
        else
            console.log(error);
        //Print toast or alert
        if (details[0]) {
            editDetails(details[0].user, detail.height, detail.weight)
            alldetails.push(details[0])
            history.push("/physical")
        }
        else
            console.log(error)
        setdetail({ height: " ", weight: " ", bmi: " " })
    })
    const onChange = (e) => {
        e.preventDefault();
        setdetail({ ...detail, [e.target.name]: e.target.value })
    }

    return (

        <div>
            <form onSubmit={OnClick}>
                {error && error[0] ? <h4 className='m-2' style={{ position: "absolute", top: "10vh" }} >{error[0].msg}</h4> : ""}
                {details && details[0] && detail ? <>
                    <h2 className='m-3'>Edit Physical Details!</h2>
                    < div className='container' style={{
                        display: "flex", flexDirection: "column", justifyContent: "space-evenly", marginTop: "15vh", width: "50vw", height: "50vh",
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.20)",
                        border: "1px solid #eee",
                    }}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Height</label >
                            <input type="number" name="height" className="form-control" value={detail.height} id="exampleFormControlInput1" placeholder="in cm" onChange={onChange} min={1} step={0.01} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword5" className="form-label">Weight</label>
                            <input type="number" id="inputPassword5" name="weight" className="form-control" value={detail.weight} placeholder="in kgs" aria-describedby="passwordHelpBlock" onChange={onChange} min={1} step={0.01} />
                        </div>
                        <button type="submit" style={{ height: "7vh", color: "rgb(110 99 197)", width: "10vw", marginLeft: "20vw" }}>Submit</button>
                    </div></> : ""
                }

            </form ></div >
    )
}

export default EditPhysical