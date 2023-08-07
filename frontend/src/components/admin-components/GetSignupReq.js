import { Button } from 'bootstrap';
import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const GetSignupReq = () => {
    const [requests, setRequests]=useState([]);
    const navigate=useNavigate();
    const getReq=async()=>{
        try{
            const res=await fetch('/signupReq', {
                method: "GET",
                headers:{
                    // "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })
            // data=await res.json();
            console.log(res.status);
            const data=await res.json();
            if(!(res.status===200)){ 
                throw new Error(data.error);
            }
            setRequests(data.signups);
        }catch(err){
            alert("You don't have access for this currently: "+ err.message); 
            navigate("/login");
            
        }
    }
    useEffect(()=>{
        getReq();
    },[]);

    if(!requests){
        return(
            <h2>Loading...</h2>
        )
    }
    return (
    <>
        <h2>Requests are shown here</h2>
        {requests.map((request)=>{
            return(
                <div key={request._id} className='container'>
                    <hr/>
                    <h4>{request.department}</h4>
                    <h5>{request.specialization}</h5>
                    <p>{request.firstname} {request.lastname}</p>
                    <Link to={request._id}>
                        <p>open</p>
                    </Link>
                </div>
            )
        })}
    </>
  )
}

export default GetSignupReq