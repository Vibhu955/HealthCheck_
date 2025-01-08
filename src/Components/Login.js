import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useLocation} from 'react-router-dom';
import Loading from './loading';

function Login() {
    const history = useHistory();
    const [open, setOpen] = useState(false); //Toast
    const [progress, setProgress] = useState(0);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [typee, settypee] = useState("password")
    const [eyee, seteyee] = useState("fa-regular fa-eye");
    const [show, setshow] = useState("");
    const [link, setlink] = useState(false);
    const [forgot,setforgot]= useState("login");
    const [post,setPost]= useState("POST");
    let loc = useLocation();
    useEffect(() => {
        // console.log(loc.pathname);
        if(loc.pathname=="/forgotpassword")
        {            
            setforgot("forgotpass");
            setPost("PUT");
        }
        else
        {
            setforgot("login");
            setPost("POST");
        }       
    }, [loc])

    const onIconClick = () => {
        if (eyee === "fa-solid fa-eye-slash") {
            seteyee("fa-regular fa-eye");
            settypee("password");
        }
        else {
            seteyee("fa-solid fa-eye-slash");
            settypee("text");
        }
    }
    const OnClick2 = async (e) => {
        localStorage.removeItem("token");
        history.push("/signup");
    }
    const OnClick = async (e) => {
        e.preventDefault();
        setOpen(true);
        setProgress(progress + 10);
        
        const promise = await fetch(`http://localhost:3001/api/auth/${forgot}`, {
            method: `${post}`,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });
        const data = await promise.json();

        setProgress(progress + 20);

        //Toasts or MODALS
        if (data.success) {
            setlink(false)
            if(forgot=="login")
            setshow("Loggedin Successfully!!!")
            else
            setshow("Password Reset Successfully")
            setProgress(50);
            setTimeout(() => {
                setProgress(70);
            }, 1000);
            setTimeout(() => {
                setProgress(100);
            }, 2000);
            localStorage.setItem("token", data.token);
            setTimeout(() => {
                if(forgot=="login")
                history.push('/');
                else
                history.push('login');
            }, 2500);
        }
        else {
            setProgress(100);
            if (data.link) {
                setlink(true);
                setshow("Account isn't created!!");
            }
            else {
                setlink(false)
                setshow(data.error);
            }
        }
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
            <button type="button" className="btn-close" ></button>
          </div>
          <hr />
        </>
      </Toast> */}

            <h5 className='msg' style={{ position: "absolute", left: "45vw", top: "10vh" }}>{show}
                {link === true ? <p style={{ fontSize: "smaller" }}><Link to="/signup">Create account </Link></p> : ""}
            </h5>
            <h1 className='mx-2 login' style={{ position: "absolute", top: "10vh" }}>{forgot=== "login"?"Login here":"Forgot Password"} !</h1>
            <div className='form container' style={{
                border: "1px solid black",
                marginTop: "19vh",
                width: "50vw",
                height: "50vh",
                display: "flex",
                flexDirection: "column",
            }}>
                <form onSubmit={OnClick}>
                    <Loading setProgress={setProgress} progress={progress} />
                    <div className="my-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input type="email" value={email} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={onChangeemail} />
                    </div>
                    <div>
                        <label htmlFor="inputPassword5" className="form-label">Password</label>
                        <div className='icons'>
                            <input type={`${typee}`} id="inputPassword5" value={password} placeholder="Password" className="form-control pass" onChange={onChangepass} />
                            <i className={`${eyee}`} onClick={onIconClick}></i>
                        </div>
                    </div>
                    {forgot==="login"?<div className='mt-3'><Link to="/forgotpassword" style={{ fontSize: "small" }}>Forgot Password?</Link></div>:""
                    }
                    <div className="my-2">
                        <input type="checkbox" id="remember" className='remember' />
                        <label htmlFor="remember" style={{ fontSize: "small" }}>Remember me?</label>
                    </div>
                    {forgot==="login"?<button type='submit' className="btn btn-dark my-3 " style={{
                        height: "7vh", color: "rgb(110 99 197)", width: "10vw", position: "absolute", top: "65vh", left: "35vw"
                    }}>Login</button> : <button type='submit' className="btn btn-dark my-3" style={{
                        height: "7vh", color: "rgb(110 99 197)", width: "12vw", position: "absolute", top: "65vh", left: "45vw"
                    }} > Set Password </button>}
                    {forgot==="login"?<button type="submit" onClick={OnClick2} className="btn btn-dark my-3 " style={{ height: "7vh", color: "rgb(110 99 197)", width: "10vw", position: "absolute", top: "65vh", left: "55vw" }}>
                        {localStorage.getItem("token") === null ? "SignUp" : "SignOut "}</button> : ""
                    }
                </form>

            </div>
        </div>

    )
}
export default Login