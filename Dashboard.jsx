import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
export default function Dashboard(){
  const nav = useNavigate()
  const [jobs,setJobs] = useState([])
  useEffect(()=>{ const t=localStorage.getItem('token'); if(!t){ nav('/'); return } api.get('/jobs').then(r=>setJobs(r.data)).catch(()=>{}) },[])
  return (
    <div className='p-8'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-3xl font-bold'>Dashboard</h2>
        <Link to='/job-post' className='px-4 py-2 bg-indigo-600 text-white rounded-xl'>Post a Job</Link>
      </div>
      <div className='grid gap-4'>
        {jobs.map(j=> (
          <div key={j._id} className='p-4 border rounded-xl'>
            <div className='font-semibold'>{j.title}</div>
            <div className='text-sm text-gray-600'>Budget: ₹{j.budget}</div>
          </div>
        ))}
        {jobs.length===0 && <div className='text-gray-500'>No jobs yet. Create one!</div>}
      </div>
    </div>
  )
}
