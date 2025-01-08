import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loading from './loading';

function Signup() {

    const history = useHistory();
    const [email, setemail] = useState("");
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [type, settype] = useState("password")
    const [eye, seteye] = useState("fa-regular fa-eye");
    const [show, setshow] = useState("")

    const onIconClick = () => {
        if (eye === "fa-solid fa-eye-slash") {
            seteye("fa-regular fa-eye");
            settype("password");
        }
        else {
            seteye("fa-solid fa-eye-slash");
            settype("text");
        }
    }

    const onClick = async (e) => {
        e.preventDefault();
        setOpen(true);
        setProgress(progress + 10);

        const promise = await fetch("http://localhost:3001/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify({ name, email, password })
        });
        const data = await promise.json();
        setProgress(progress + 20);

        if (data.success) {
            setshow("Account created!!!")
            setProgress(50);
            setTimeout(() => {
                setProgress(70);
            }, 1000);
            setTimeout(() => {
                setProgress(100);
            }, 2000);
            localStorage.setItem("token", data.token);
            setTimeout(() => {
                history.push('/login');
            }, 2500);
        }
        else {
            setProgress(100);
            setshow(data.error);
            console.log(show);
        }
    }
    const onChangename = (e) => {
        setname(e.target.value);
    }
    const onChangeemail = (e) => {
        setemail(e.target.value);
    }
    const onChangepass = (e) => {
        setpassword(e.target.value);
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* <Toast isOpen={open} onClose={handleClose}>
        <>
          <div className='header'>
            <button type="button" className="btn-close"></button>
          </div>
          <hr />
        </>
      </Toast> */}
            <h5 className='msg' style={{ position: "absolute", left: "45vw", top: "10vh" }}>{show}</h5>
            <h1 className='mx-2 signup' style={{ position: "absolute", top: "10vh" }}>Signup here!</h1>
            <div className='form container' style={{
                border: "1px solid black",
                marginTop: "19vh",
                width: "50vw",
                height: "50vh",
                display: "flex",
                flexDirection: "column"
            }}>
                <form onSubmit={onClick}>
                    <Loading setProgress={setProgress} progress={progress} />
                    <div className="my-3">
                        <label htmlFor="Name" className="form-label">Name</label>
                        <input className="form-control" id="Name" type="text" value={`${name}`} placeholder="Name" aria-label="default input example" onChange={onChangename} />
                        <label htmlFor="exampleFormControlInput1" className="form-label mt-2">Email address</label>
                        <input type="email" value={`${email}`} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={onChangeemail} required />
                    </div>
                    <label htmlFor="inputPassword5" className="form-label">Password</label>
                    <div className='icons'>
                        <input type={`${type}`} id="inputPassword5" value={password} placeholder="Password" className="form-control pass" aria-describedby="passwordHelpBlock" onChange={onChangepass} minLength={3} required />
                        <i className={`${eye}`} onClick={onIconClick} ></i>
                    </div>
                    <button type="submit" className="btn btn-dark my-3" style={{ height: "7vh",  color: "rgb(110 99 197)",width: "10vw", position: "absolute", top: "65vh", left: "45vw" }}>SignUp</button>
                </form>
            </div>
        </div>
    )

}
export default Signup