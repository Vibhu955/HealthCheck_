import React, { useState } from 'react'
import Background from './canvas/Background.js';

function About() {
    const [load, setload] = useState(true)
    setTimeout(() => {
        setload(false)
    }, 4000)

  return (
    <div>
      
        {load&&<Background />}
      

      </div>

  )
}

export default About