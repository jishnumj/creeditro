import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
export default function JobPost(){
  const [title,setTitle]=useState('')
  const [desc,setDesc]=useState('')
  const [budget,setBudget]=useState(1000)
  const [err,setErr]=useState('')
  const nav = useNavigate()
  async function submit(e){ e.preventDefault(); setErr(''); try{ await api.post('/jobs',{title,description:desc,budget}); await api.post('/payments/process',{method:'mock',amount:budget}); alert('Job posted with payment'); nav('/dashboard') }catch(e){ setErr(e?.response?.data?.message||'Error') } }
  return (
    <div className='max-w-3xl mx-auto p-8'>
      <h2 className='text-2xl font-bold mb-4'>Post a Job</h2>
      <form onSubmit={submit} className='space-y-4'>
        <input className='w-full p-3 border rounded-xl' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className='w-full p-3 border rounded-xl h-40' placeholder='Description' value={desc} onChange={e=>setDesc(e.target.value)} />
        <input type='number' className='w-full p-3 border rounded-xl' value={budget} onChange={e=>setBudget(Number(e.target.value))} />
        {err && <div className='text-red-600'>{err}</div>}
        <button className='px-4 py-2 bg-indigo-600 text-white rounded-xl'>Post & Pay</button>
      </form>
    </div>
  )
}
