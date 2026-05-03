import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
export default function AuthModal({ onClose, onSuccess }){
  const { login, signup } = useAuth()
  const [tab,setTab] = useState('login')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  async function submit(e){ e.preventDefault(); setError(''); setLoading(true); try{ if(tab==='login') await login(email,password); else await signup(name,email,password); onSuccess() }catch(err){ setError(err?.response?.data?.message || err.message) } finally{ setLoading(false) } }
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl shadow-2xl w-[420px] p-6'>
        <div className='flex gap-2 mb-4'>
          <button onClick={()=>setTab('login')} className={`flex-1 py-2 rounded-xl ${tab==='login'?'bg-indigo-600 text-white':'bg-gray-100'}`}>Login</button>
          <button onClick={()=>setTab('signup')} className={`flex-1 py-2 rounded-xl ${tab==='signup'?'bg-indigo-600 text-white':'bg-gray-100'}`}>Signup</button>
        </div>
        <form onSubmit={submit} className='space-y-3'>
          {tab==='signup' && <input className='w-full p-3 border rounded-xl' placeholder='Full name' value={name} onChange={e=>setName(e.target.value)} required/>}
          <input className='w-full p-3 border rounded-xl' placeholder='Email' type='email' value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input className='w-full p-3 border rounded-xl' placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} required/>
          {error && <div className='text-red-600 text-sm'>{error}</div>}
          <button disabled={loading} className='w-full py-3 rounded-xl bg-indigo-600 text-white hover:opacity-95'>{loading? 'Please wait…' : (tab==='login'?'Login':'Create account')}</button>
        </form>
        <button onClick={onClose} className='mt-4 w-full py-2 rounded-xl bg-gray-200'>Close</button>
      </div>
    </div>
  )
}
