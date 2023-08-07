import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
const ShowSignupReq = () => {
    const navigate=useNavigate();
    const [empreq, setEmpReq]=useState({
        firstname:"",
        middlename: "",
        lastname: "",
        email:"",
        phone:"",
        casualLeave: 0,
        paidLeave: 0,
        dob:"",
        specialization: "",
        department:"",
        gender: ""
    });
    useEffect(()=>{
        const getReq=async()=>{
            try{
                const res=await fetch(`http://localhost:5000/signupReq/${id}`, {
                    method: "GET",
                    headers:{
                        // "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    // mode: 'cors',
                    credentials: 'include'
                })
                // data=await res.json();
                const data=await res.json();
                console.log(data);
                if(!res.status===200){ 
                    throw new Error(res.error);
                }
                setEmpReq(data.request);
                
                console.log(empreq);
            }catch(err){
                console.log(err);
                navigate("/getsignupreq");
            }
        }
        getReq();
    
    },[]);
    const { id }=useParams();
    console.log(id);
    const handleInput=(e)=>{
        console.log(e);
        setEmpReq({...empreq, [e.target.name]: e.target.value});
    }
    const submitForm=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch(`http://localhost:5000/signupReq/${id}`, {
                method: "POST",
                headers:{
                    // "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    empreq
                }),
                credentials: 'include',
            }) 
            const data=await res.json();
            if(res.status!==201){
                throw new Error(data.error);
            }
            else{
                window.alert("Created an Employee");
                navigate('/getsignupreq');
            }

        }catch(err){
            console.log(err);
        }
    }
    const rejectForm=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch(`http://localhost:5000/signupReq/${id}`, {
                method: "DELETE",
                headers:{
                    // "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })
            if(res.status!==204){
                throw new Error(res.error);
            }
            else{
                window.alert("Req rejected");
                navigate('/signupRequests');
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
    <>
        <div className="container">
        <form>
            <div className="form-group">
                <label for="role">Role: </label>
                <input type="text" name="role" value={empreq.role} onChange={handleInput} className="form-control" id="role" placeholder='HOD/Acting HOD/Professor'/>
            </div>
            <div className="form-group">
                <label for="firstname">First Name: </label>
                <input disabled type="text" name="firstname" value={empreq.firstname} id="firstname" className="form-control"/>
            </div>
            <div className="form-group">
                <label for="middlename">Middle Name: </label>
                <input disabled type="text" name="middlename" value={empreq.middlename} id="middlename" onChange={handleInput} className="form-control"/>
            </div>
            <div className="form-group">
                <label for="lastname">Last Name: </label>
                <input disabled type="text" name="lastname" value={empreq.lastname} id="lastname" onChange={handleInput} className="form-control"/>
            </div>
            <div className="form-group">
                <label for="email">Email: </label>
                <input disabled type="email" name="email" value={empreq.email} onChange={handleInput} className="form-control" id="email"/>
            </div>
            <div className="form-group">
                <label for="phone">Phone: </label>
                <input disabled type="number" name="phone" value={empreq.phone} onChange={handleInput} className="form-control" id="phone"/>
            </div>

            <div className="form-group">
                <label for="casual-leave">Casual Leave: </label>
                <input type="number" name="casualLeave" value={empreq.casualLeave} onChange={handleInput} className="form-control" id="casual-leave"/>
            </div>
            <div className="form-group">
                <label for="paid-leave">Paid: </label>
                <input type="number" name="paidLeave" value={empreq.paidLeave} onChange={handleInput} className="form-control" id="casual-leave"/>
            </div>
            <div className="form-group">
                <label for="dob">DOB: </label>
                <input disabled type="text" name="dob" value={empreq.dob} onChange={handleInput} className="form-control" id="dob"/>
            </div>
            <div className="form-group">
                <label for="specialization">Specialization: </label>
                <input disabled type="text" name="specialization" value={empreq.specialization} id="specialization" onChange={handleInput} className="form-control"/>
            </div><div className="form-group">
                <label for="department">Department: </label>
                <input disabled type="text" name="department" value={empreq.department} id="department" onChange={handleInput} className="form-control"/>
            </div><div className="form-group">
                <label for="gender">Gender: </label>
                <input disabled type="text" name="gender" value={empreq.gender} id="gender" onChange={handleInput} className="form-control"/>
            </div>
            <button onClick={submitForm}  className="btn btn-success">Approve</button>
            <button onClick={rejectForm}  className="btn btn-danger">Reject</button>
            </form>
            
    </div>
    </>
  )
}

export default ShowSignupReq