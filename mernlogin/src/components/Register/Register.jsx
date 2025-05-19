import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './Register.css'
import axios from 'axios'

const Register = ({goTo}) => {

  const [email,setemail]=useState("");
  const[password,setpassword]=useState("");

  const handlesubmit=async()=>{
    try{
      await axios.post('http://localhost:5000/api/auth/register',
        {email,password})
      ;
      alert("registration successful");
      goTo('login')
    }
    
    catch{
      alert("user already exists")
    }
  }

  return (
    <div className='container'>
      <h2>Register</h2>

      <form onSubmit={handlesubmit} className='form'>

        <input className='inputvalues'type='email' placeholder='Enter your Email' value={email} onChange={e=>setemail(e.target.value)} required/>

        <input className='inputvalues'type='password' placeholder='Enter your password' value={password} onChange={e=>setpassword(e.target.value)}/>

        <button type='submit'>Register</button>

      </form>
      
      <p>Already have an Account
      <button className='buttonhere'onClick={()=>goTo('login')} style={{border:'none',background:'green',color:'white',cursor:'pointer'}}>Sign in</button></p>
      
      
    </div>
  )
}

export default Register
