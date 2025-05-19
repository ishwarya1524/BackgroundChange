import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';

const Login = ({setemail,setcolor,goTo}) => {

    const[email,setEmail]=useState("")
    const[password,setpassword]=useState("")

const handlesubmit=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post('https://backgroundchange.onrender.com/api/auth/login',{email,password}
      )
      setemail(email);
      setcolor(res.data.color);
      localStorage.setItem('email',email)
      goTo('color')

    }
    catch{
        alert("invalid credentials")
    }
    
    
}

  return (
    <div className='container'>
      <h2 >Login</h2>
      <form className='form' onSubmit={handlesubmit}>

        <input className='inputvalues'type='email' value={email} placeholder='Enter the email' onChange={e=>setEmail(e.target.value)} required/>

        <input className='inputvalues'type='password' value={password} placeholder='"enter the password' onChange={e=>setpassword(e.target.value)} required/>

        <button type='submit'>Login</button>

      </form>
      <p>Create Account
      <button onClick={()=>goTo('register')}>Register</button>
      </p>
    </div>
  )
}

export default Login
