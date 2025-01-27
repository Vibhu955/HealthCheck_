import React, { useState } from "react";
import PhysicsContext from "./physicalContext";
import axios from "axios";
const PhysicalState = (props) => {

  const alldetails = []
  const users = []
  const errors = []
  const results = ""
  const [details, setdetails] = useState(alldetails);
  const [user, setuser] = useState(users);
  const [error, seterror] = useState(errors);
  const [result, setResult] = useState(results);

  //ALL Details------------------
  const Details = async () => {
    //APi
    const data = await (await fetch(`${process.env.REACT_APP_DATABASE_URL}/api/physical/details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      }
    })).json();
    setdetails(data);
    if(data[0])
    setuser(data[0].user);
  }

  //ADD Physical-------------------
  const addphysical = async (height, weight, bmi) => {
    //APi
    const promise = await fetch(`${process.env.REACT_APP_DATABASE_URL}/api/physical/addphysical`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify({ height, weight, bmi })
    });
    const data = await promise.json();
    if (!data.errors) {
      setdetails(details.concat(data))
      seterror(null)
    }
    else
      seterror(error.concat(data.errors))
  }

  // editing details /api/physical/updatephysical/665aede0653309cbc7aa74e5
  const editDetails = async (id, height, weight) => {
    //API
    const data = await (await fetch(`${process.env.REACT_APP_DATABASE_URL}/api/physical/updatephysical/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify({ height, weight })
    })).json();
    console.log(data)
    if(!data.errors)
    {
      seterror(errors)
      let New = JSON.parse(JSON.stringify(details));
      for (let i = 0; i <= New.length; i++) {
        if (New[i].user === id) {
          New[i].bmi = data.sameUser.bmi;
          New[i].height = height;
          New[i].weight = weight;
          break;
        }
      }
      setdetails(New);
    }
    else
    {
    seterror(error.concat(data.errors))
    // console.log(error)  
  }    
  }

// editing details for diabetes /api/physical/diabetes/665aede0653309cbc7aa74e5
  const updateDiabetes=(async (id,result)=>{

    const response = (await axios.post(`${process.env.REACT_APP_DATABASE_URL}/api/physical/diabetes/${id}`
    ,{result},
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        }
    }))
    setResult(response.data.result)
    console.log(response)  
    if(!response.errors)
        {
          seterror(errors)
          let New = JSON.parse(JSON.stringify(details));
          for (let i = 0; i <= New.length; i++) {
            if (New[i].user === id) {
              New[i].result = result;
              break;
            }
          }
          setdetails(New);
        }
        else
        {
        seterror(error.concat(response.errors))
        console.log(error)  
      }     
})

  return (
    <PhysicsContext.Provider value={{ details, user, Details, addphysical, updateDiabetes ,error, editDetails, alldetails, result, setResult }}>
      {props.children}
    </PhysicsContext.Provider>
  )
}
export default PhysicalState;