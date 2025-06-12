import React, { useState } from 'react'
import Background from './canvas/Background.js';

function About() {
  const [load, setload] = useState(true)
  setTimeout(() => {
    setload(false)
  }, 4000)

  return (
    <>
      {load && <Background />}

      {!load && <div className="container">
        <h2 className="text-2xl font-semibold mb-3 text-purple-800 my-4">About Us</h2>
        <div className="">

          <p className="text-lg leading-7 text-gray-700 max-w-3xl">
            HealthCare is a dedicated platform built by a Vibhuti Joshi, a passionate developer, healthcare Concerned, and hardwork- driven. My mission is to simplify health awareness by combining intuitive tools with data-driven assessments, allowing users to better understand and manage their well-being.
          </p>
          <p className="mt-3 text-lg text-gray-700 max-w-3xl">
            I believe that early detection, regular check-ins, and accessible guidance can make a difference. By integrating AI with therapeutic and medical insights, I can help users navigate their mental and physical health in a safe, judgment-free environment.
          </p>
          <p className="mt-3 text-lg text-gray-700 max-w-3xl">
            Your privacy, comfort, and growth are our priorities.
          </p>
        </div>

      </div>}
    </>
  )
}

export default About