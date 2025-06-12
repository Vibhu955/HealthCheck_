import React from 'react'
import BackHome from './canvas/BackHome.js';

function Home() {

  return (
    <div className='container'>
      <h1 className="text-3xl font-bold mb-4 text-purple-800 my-4" style={{fontFamily: 'Arial, sans-serif'}}>Welcome to HealthCare</h1>
      <div className="">
      <p className="text-lg leading-7 text-gray-700 max-w-3xl" style={{fontFamily: 'Arial, sans-serif', fontWeight: '400'}}>
        Your mental and physical well-being matters. At HealthCare, we offer a secure and supportive platform where you can explore health resources, take personalized mental and physical check-ups, and find clarity on your concerns with expert-reviewed insights.
      </p>
      <p className="mt-4 text-lg text-gray-700 max-w-3xl"  style={{fontFamily: 'Arial, sans-serif', fontWeight: '400'}}>
        Whether you're feeling overwhelmed, anxious, curious about your health, or just need a space to self-reflect, we're here to assist you every step of the way. Start your journey toward a healthier you — right here, right now.
      </p>
      <p className="text-lg leading-7 text-gray-700 max-w-3xl"  style={{fontFamily: 'Arial, sans-serif', fontWeight: '400'}}>
        Concerned about your blood sugar levels or potential risk of diabetes? Our Physical Check-Up tool provides a quick and intelligent way to assess your likelihood of developing diabetes based on key health indicators.
      </p>
      <p className="mt-4 text-lg text-gray-700 max-w-3xl"  style={{fontFamily: 'Arial, sans-serif', fontWeight: '400'}}>
        Take the first step towards understanding your health better. Engage with our platform to gain insights, track your well-being, and connect with resources tailored to your needs.
      </p>
      </div>      

      <BackHome />
    </div>
  )
}

export default Home