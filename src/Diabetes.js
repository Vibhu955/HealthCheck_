import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Diabetes() {
    const [data, setdata] = useState(({}))
    useEffect(() => {
        async function fetchData() {
            const response = (await axios.get('http://127.0.0.1:5000/prediction'))
            //     , {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // }))

            setdata(response.data)
            console.log(response)
        }
        fetchData();
    }, [])

    return (
        <div>
            {data?<h6>{data.result}</h6>:""}
        </div>
    );
}
export default Diabetes;