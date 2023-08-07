import React, { useEffect, useState } from 'react'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
const EditUserDetails = () => {
    const location=useLocation();
    const user=location.state;
    console.log("Edit User Details");
    console.log(user);
    const navigate=useNavigate();
    const [details, setDetails]=useState(user);

    // const [details, setDetails]=useState({
    //     firstname:props.user.firstname,
    //     middlename: props.user.middlename,
    //     lastname: props.user.lastname,
    //     email:props.user.email,
    //     phone:props.user.phone,
    //     casualLeave:user.leaves.casual|| 0,
    //     paidLeave: user.leaves.paid || 0,
    //     dob:props.user.dob,
    //     specialization: props.user.specialization,
    //     department:props.user.department,
    //     gender: props.user.gender
    // });
    
    const handleInput=(e)=>{
        console.log(e);
        setDetails({...details, [e.target.name]: e.target.value});
    }
    const handleNestedInput=(e)=>{
        setDetails({...details, leaves: {...details.leaves, [e.target.name]: e.target.value}});
    }
    const submitForm=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch(`http://localhost:5000/user/${user._id}`, {
                method: "PUT",
                headers:{
                    // "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    details
                }),
                credentials: 'include',
            }) 
            const data=await res.json();
            if(res.status!==201){
                throw new Error(data.error);
            }
            else{
                window.alert("Updated details");
                navigate(`/admin/user/${user._id}`);
            }

        }catch(err){
            console.log(err);
        }
    }
    console.log("details are: ")
    console.log(details);
    return (
    <>
        <div className="container">
        <form>
            <div className="form-group">
                <label htmlFor="role">Role: </label>
                <input type="text" name="role" value={details.role} onChange={handleInput} className="form-control" id="role"/>
            </div>
            <div className="form-group">
                <label htmlFor="firstname">First Name: </label>
                <input type="text" name="firstname" value={details.firstname} id="firstname" onChange={handleInput} className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="middlename">Middle Name: </label>
                <input type="text" name="middlename" value={details.middlename} id="middlename" onChange={handleInput} className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="lastname">Last Name: </label>
                <input type="text" name="lastname" value={details.lastname} id="lastname" onChange={handleInput} className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" value={details.email} onChange={handleInput} className="form-control" id="email"/>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone: </label>
                <input type="number" name="phone" value={details.phone} onChange={handleInput} className="form-control" id="phone"/>
            </div>

            <div className="form-group">
                <label htmlFor="casual-leave">Casual Leave: </label>
                <input type="number" name="casual" value={details.leaves.casual} onChange={handleNestedInput} className="form-control" id="casual-leave"/>
            </div>
            <div className="form-group">
                <label htmlFor="paid-leave">Paid Leaves: </label>
                <input type="number" name="paid" value={details.leaves.paid} onChange={handleNestedInput} className="form-control" id="casual-leave"/>
            </div>
            <div className="form-group">
                <label htmlFor="dob">DOB: </label>
                <input type="text" name="dob" value={details.dob} onChange={handleInput} className="form-control" id="dob"/>
            </div>
            <div className="form-group">
                <label htmlFor="specialization">Specialization: </label>
                <input type="text" name="specialization" value={details.specialization} id="specialization" onChange={handleInput} className="form-control"/>
            </div><div className="form-group">
                <label htmlFor="department">Department: </label>
                <input type="text" name="department" value={details.department} id="department" onChange={handleInput} className="form-control"/>
            </div><div className="form-group">
                <label htmlFor="gender">Gender: </label>
                <input type="text" name="gender" value={details.gender} id="gender" onChange={handleInput} className="form-control"/>
            </div>
            <button onClick={submitForm}  className="btn btn-success">Approve</button>
            <hr/>
            </form>
            
    </div>
    </>
  )
}

export default EditUserDetails;