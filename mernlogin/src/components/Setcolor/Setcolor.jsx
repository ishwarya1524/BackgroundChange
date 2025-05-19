import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Setcolor.css'


const Setcolor = ({color,setcolor,email}) => {

  const[tempcolor,settempcolor]=useState(color||'#fff')


    useEffect(()=>{
        settempcolor(color||'#fff')
        document.body.style.backgroundColor=color||'fff'
    },[color]);

    const handlechange=async (e)=>{
        const newcolor=e.target.value;
        setcolor(newcolor);
        document.body.style.backgroundColor=newcolor
    }

    const handlesave=async()=>{
      try{
        await axios.post('https://backgroundchange.onrender.com/api/auth/save-color',{
          email, color:tempcolor,
        });
        setcolor(tempcolor)
        alert('color saved successfully')
      }
      catch(err){
        console.error("error saving color",err)
        alert("failed to save the color")
      }
    }

    const handlegetcolor=async()=>{
      try{
        const res=await axios.get(`https://backgroundchange.onrender.com/api/auth/getcolor/${email}`)
        const savecolor=res.data.color||'#fff'
        settempcolor(savecolor)
        setcolor(savecolor)
        document.body.style.backgroundColor=savecolor
        alert("color fetched successfully")
      }
      catch(err){
        console.log("error fetching color",err)
        alert("faile to fetch color")
      }
    }

  return (
    <div className='container' style={{background:'white'}}>
      <h2>Type a color</h2>
      <input className='input' type='text' value={tempcolor} onChange={handlechange} placeholder='Enter a color...'/>
      <div className='buttons'>
      <button className='but'onClick={handlesave}>Save Color</button>
      <button className='but'onClick={handlegetcolor} >Get Color</button>
      </div>
    </div>
  )
}

export default Setcolor
