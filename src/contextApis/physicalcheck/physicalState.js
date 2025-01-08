import React, { useState } from "react";
import PhysicsContext from "./physicalContext";

const PhysicalState = (props) => {

  const host = "http://localhost:3001";
  const alldetails = []
  const users = []
  const errors = []

  const [details, setdetails] = useState(alldetails);
  const [user, setuser] = useState(users);
  const [error, seterror] = useState(errors);


  //ALL Details------------------
  const Details = async () => {
    //APi
    const data = await (await fetch(`${host}/api/physical/details`, {
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
    const promise = await fetch(`${host}/api/physical/addphysical`, {
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
    const data = await (await fetch(`${host}/api/physical/updatephysical/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify({ height, weight })
    })).json();
    console.log(data)

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

  return (
    <PhysicsContext.Provider value={{ details, user, Details, addphysical, error, editDetails, alldetails }}>
      {props.children}
    </PhysicsContext.Provider>
  )
}
export default PhysicalState;