import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthModal from '../components/AuthModal'
export default function LandingPage(){
  const [show,setShow]=useState(false)
  const nav = useNavigate()
  return (
    <div className='min-h-screen flex items-center justify-center text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <div className='text-center'>
        <h1 className='text-5xl font-extrabold mb-4 drop-shadow'>Welcome to CreEditro</h1>
        <p className='opacity-90'>Connect with top editors and companies seamlessly</p>
        <button onClick={()=>setShow(true)} className='mt-8 px-6 py-3 bg-white text-indigo-600 rounded-xl shadow-lg'>Get Started</button>
      </div>
      {show && <AuthModal onClose={()=>setShow(false)} onSuccess={()=>nav('/dashboard')} />}
    </div>
  )
}
