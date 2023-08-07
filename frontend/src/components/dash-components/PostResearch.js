import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'


const PostResearch = (props) => {
  const navigate=useNavigate();
  const [research, setResearch]=useState({
    empID:props.user._id, 
    title: "",
    description: "",
    skills: "",
    applicationProcess: "",
    duration: "",
    contactEmail: props.user.email,
    contactNumber: props.user.phone,
    additionalInfo: "",
    benefits: "",
    openings: null,
    status: "recruiting",
    postingDate: new Date(),
    // displayStatus: "true"
  })
  const handleInput=(e)=>{
    console.log(e);
    setResearch({...research, [e.target.name]: e.target.value});
}
  const formSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res= await fetch("http://localhost:5000/research", {
        method: "POST",
        headers:{
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            research
        })
      })
      const data=await res.json();
      if(res.status!==201){
          throw new Error(data.error)
      }
      else{
          window.alert(data.message);
          navigate("/");
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    console.log("research use effect");
    console.log("use effect research props: ", props);
    setResearch({...research, empID: props.user._id, contactEmail: props.user.email, contactNumber: props.user.phone, postingDate: new Date().toISOString().substring(0, 10)});
  },[props])
  console.log("props: ", props);
  console.log("empID: ", research.empID);
  return (
    <div  style={{ padding:"10px"}}>
      <h1 style={{textAlign: "center"}}>Add your research here !</h1>
        <div className='container' style={{borderRadius: "10px", backgroundColor: "white",margin: "auto", width: "50%", boxShadow: "rgb(13 110 253 / 66%) 0px 1px 20px 2px"}}>
          
          <form method="POST" style={{margin: '10px', padding: "10px"}}>
            <div className='row'>
              <div className="form-group col-md-4">
                <label for="status"><strong>Status: </strong></label>
                <select onChange={handleInput} name="status" defaultValue={research.status}>
                  <option value="recruiting">RECRUITING</option>
                  <option value="in-progress">IN-PROGRESS</option>
                  <option value="completed">COMPLETED</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label for="duration"><strong>Duration:</strong> </label>
                <input type="text" name="duration" value={research.duration} id="duration" onChange={handleInput} className="form-control"/>
              </div>
              <div className="form-group col-md-4">
                <label for="openings"><strong>Number of Openings:</strong>  </label>
                <input type="text" name="openings" value={research.openings} id="openings" onChange={handleInput} className="form-control"/>
              </div>

            </div>
          
            <div className="form-group">
                <label for="title"><strong>Title/Topic:</strong> </label>
                <input type="text" name="title" value={research.title} id="title" onChange={handleInput} className="form-control" placeholder="Title for your Research"/>
            </div>
            <div className="form-group">
                <label for="description"><strong>Description:</strong> </label>
                <textarea name="description" value={research.description} id="description" onChange={handleInput} className="form-control"/>
            </div>
            <div className="form-group">
                <label for="skills"><strong>Skills Required:</strong> </label>
                <textarea  name="skills" value={research.skills} id="skills" onChange={handleInput} className="form-control"/>
            </div>
            <div className="form-group">
                <label for="additionalInfo"><strong>Additional Information:</strong> </label>
                <textarea name="additionalInfo" value={research.additionalInfo} id="additionalInfo" onChange={handleInput} className="form-control"/>
            </div>
            <div className="form-group">
                <label for="benefits"><strong>Benefits:</strong> </label>
                <textarea name="benefits" value={research.benefits} id="benefits" onChange={handleInput} className="form-control"/>
            </div>
            
            <div className='row'>
              <div className="form-group col-md-8">
                  <label for="contactEmail"><strong> Contact Email:</strong> </label>
                  <input type="text" name="contactEmail" value={research.contactEmail} id="contactEmail" onChange={handleInput} className="form-control"/>
              </div>
              <div className="form-group col-md-4">
                  <label for="contactNumber"><strong>Contact Number:</strong> </label>
                  <input type="text" name="contactNumber" value={research.contactNumber} id="contactNumber" onChange={handleInput} className="form-control"/>
              </div>
              
            </div>
            <div className="form-group">
                  <label for="applicationProcess"><strong>Application Process:</strong> </label>
                  <textarea name="applicationProcess" value={research.applicationProcess} id="applicationProcess" onChange={handleInput} className="form-control"/>
            </div>
            <button className="text-center btn btn-primary" onClick={formSubmit}>Submit</button>
          </form>
        </div>
        
      </div>
  )
}

export default PostResearch