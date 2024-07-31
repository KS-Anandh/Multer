import React, { useEffect, useState } from 'react'
import axio from 'axios'
import axios from 'axios';
const App = () => {
  const [file,setFile]=useState();
  const [image,setImage]=useState();
  const [user,setUser]=useState();

  const formdata=new FormData()
  formdata.append('file',file)
  formdata.append("user",user)
  
  const fileHandler=()=>{
    axios.post(`http://localhost:3000/uploads`,formdata, {
      headers: {
          'Content-Type': 'multipart/form-data',
      }})
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)})
  }
  useEffect(()=>{
    axios.get("http://localhost:3000/getImg")
    .then((res)=>{setImage(res) 
      console.log(res.data)
      setImage(res.data)})
    .catch((err)=>{console.log(err)})
  },[])
  return (
    <div>
      <input type='text' onChange={e=> setUser(e.target.value)}/>
      <input type='file' onChange={e => setFile(e.target.files[0])}/>
      <button onClick={fileHandler}>Upload</button><br/>
      {image?image.map((value,index)=>{
        console.log(value)
        return <>
             <img key={index} src={`http://localhost:3000/Images/${value.image}`} width={200} height={200}/>
              </>
      }):""}
    </div>
  )
}

export default App