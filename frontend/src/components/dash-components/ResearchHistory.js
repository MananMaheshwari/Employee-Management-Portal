import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'

function ResearchHistory(props) {
    const navigate=useNavigate();

    const [researches, setResearches]=useState();

    const fetchResearches=async()=>{
        console.log("fetching requests in fetchResearches");
        try{
            const res=await fetch(`http://localhost:5000/employee/${props.user._id}/research`, {
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
                throw new Error("error fetching request");
            }
            const data=await res.json();
            console.log("data: ", data);
            console.log("fetch research: ",data);
            setResearches(data.researches);   
        }catch(err){
            console.log("research history error: ",err);
        } 
    }
    useEffect(()=>{
        fetchResearches();
    },[props]);
    
    const routeToResearch=(research)=>{
        navigate(`/dashboard/research/${research._id}/edit`);
    }
    return (
    <div> 
        <h1>Research History:</h1>
        {(researches)?
            <div>
                {console.log("true")}
                {researches.map((research)=>{
                    console.log("research present", research);
                    return(
                        
                        <div onClick={()=>routeToResearch(research)} key={research._id} style={{border: "1px solid black", padding: "5px", margin: "5px"}}>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <p><strong>Title: </strong> {research.title}</p>

                                </div>
                                <div className='col-md-6'>
                                    <p><strong>Description: </strong> {research.description}</p>

                                </div>
                                <div className='col-md-2'>
                                    <p><strong>Status: </strong> {research.status}</p>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div> : 
            <div>
                <h3>Nothing to show</h3>
            </div>
        } 
    </div>
  )
}

export default ResearchHistory