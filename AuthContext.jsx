import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'
const Ctx = createContext()
export const useAuth = ()=> useContext(Ctx)
export function AuthProvider({children}){
  const [user,setUser] = useState(null)
  useEffect(()=>{ const token = localStorage.getItem('token'); if(token) setUser({token}) },[])
  async function login(email,password){ const {data} = await api.post('/auth/login',{email,password}); localStorage.setItem('token',data.token); setUser({token:data.token}); return true }
  async function signup(name,email,password){ const {data} = await api.post('/auth/signup',{name,email,password}); localStorage.setItem('token',data.token); setUser({token:data.token}); return true }
  function logout(){ localStorage.removeItem('token'); setUser(null) }
  return <Ctx.Provider value={{user,login,signup,logout}}>{children}</Ctx.Provider>
}
