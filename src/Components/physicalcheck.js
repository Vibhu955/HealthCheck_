import React, { useContext, useEffect, useState } from 'react'
import PhysicsContext from '../contextApis/physicalcheck/physicalContext'
import { useHistory } from 'react-router-dom';

function Physicalcheck() {
    const { alldetails, details, Details, addphysical, error,result,setResult } = useContext(PhysicsContext);
    const history = useHistory();
    const [detail, setdetail] = useState({ height: "", weight: "", bmi: "" ,});

    const onClickEdit = (e) => {
        e.preventDefault();
        history.push('/physical/updatephysical')
    }
    const onClickDiabetes=(e)=>{
        e.preventDefault();
        setResult("");
        history.push('/physical/diabetes');

    }
    
    useEffect(() => {
        if(result)
        {
            setResult(result)
            console.log(result)
        }
        // console.log(result)
    }, [result])

    // eslint-disable-next-line 
    const OnClick = ((e) => {
        e.preventDefault();
        addphysical(detail.height, detail.weight, detail.bmi);
        setdetail({ height: " ", weight: " ", bmi: " "})

    })
    useEffect(() => {
        if (localStorage.getItem("token")) {
            Details();
        }
        else
            history.push("/login");
    }, [])

    const onChange = (e) => {
        setdetail({ ...detail, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={OnClick}>
            {/* <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>   */
            }
            {details[0] ? <>
                <h1 className='m-3'>Physical details!</h1>
                {/* <Ml/> */}
                {console.log(alldetails.concat(details[0]))}

                <table className="my-5 container table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.no.</th>
                            <th scope="col">Height</th>
                            <th scope="col">Weight</th>
                            <th scope="col">BMI</th>
                            <th scope='col'>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>{details[0].height}</td>
                            <td> {details[0].weight}</td>
                            <td>{details[0].bmi}</td>
                            <td>{details[0].result}</td>

                        </tr>
                    </tbody>
                </table>
                <button type="button" style={{ height: "7vh", color: "rgb(110 99 197)", width: "10vw", position: "absolute", right: "10%" }} onClick={onClickEdit}>Edit Details</button>
                <button type="button" style={{ height: "7vh", color: "rgb(110 99 197)", width: "10vw", position: "absolute", left: "10%" }} onClick={onClickDiabetes}>Check diabetes</button>

            </> :
                <>
                    {error[0] ? <h4 className='m-2' style={{ position: "absolute", top: "10vh" }} >{error[0].msg}</h4> : ""}
                    <div className='container' style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", marginTop: "15vh", border: "1px solid black", width: "50vw", height: "50vh" }}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Height</label >
                            <input type="number" name="height" className="form-control" value={detail.height} id="exampleFormControlInput1" placeholder="in cm" onChange={onChange} min={1} step={0.01}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword5" className="form-label">Weight</label>
                            <input type="number" id="inputPassword5" name="weight" className="form-control" value={detail.weight} placeholder="in kgs" aria-describedby="passwordHelpBlock" onChange={onChange} min={1} step={0.01}/>
                        </div>
                        <button type="submit"  style={{ height: "7vh", color: "rgb(110 99 197)", width: "10vw", marginLeft: "20vw" }}>Submit</button>
                    </div>
                </>
            }

        </form>
    )
}

export default Physicalcheck;