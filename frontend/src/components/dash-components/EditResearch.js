import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditResearch() {
  const navigate=useNavigate();
  const [research, setResearch]=useState(null);
  const {id}=useParams();
  
  const getResearch=async()=>{
    try{

      const res=await fetch(`http://localhost:5000/research/${id}`, {
        method: "GET",
        headers:{
            // "Accept": "application/json",
            "Content-Type": "application/json"
        },
        // mode: 'cors',
        credentials: 'include'
      })
      console.log("res is: ", res);
      
      if(res.status!==200){ 
          console.log("res returned with status of ", res.status )
          throw new Error("error fetching requested research");
      }
      const data=await res.json();
      console.log("data: ", data.research);
      setResearch(data.research);
    }catch(err){
      console.log("research history error: ",err);
  }
  }
  
  useEffect(()=>{
    getResearch();  
  }, [])

  return (
    <div>
        <h1>Research Edit Page:</h1> 
        {research?
        <div>
          {console.log(research)}
          {research._id}
        </div>:
        <div><h2>Loading...</h2></div>}
    </div>
  )
}

export default EditResearch