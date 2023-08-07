import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import userImage from '../../images/userImage.png'

function LeaveReq() {

    const navigate=useNavigate();
    const [leaves, setLeaves]=useState();
    const [update, setUpdate]=useState(false);
    const [shouldRun, setShouldRun]=useState(false);
    const getLeave=async()=>{
        // console.log("getLeave function triggered");
        try{
            const res=await fetch('http://localhost:5000/leave', {
                method: "GET",
                headers:{
                    // "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })
            const data=await res.json();
            if(!(res.status===200)){ 
                throw new Error("Error fetching leaves");
            }
            setLeaves(data.leaves);
            setShouldRun(true);
        }catch(err){
            navigate("/admin");
            
        }
    }
    const updatedLeaves=[];
     
    useEffect(()=>{
        console.log("useEffect 1")
        getLeave();
    },[]);

    useEffect(()=>{
        if(leaves && leaves.length>0){
            setUpdate(false);
            console.log("leaves are present ", leaves);
            const promiseArray=leaves.map((leave)=>{
                return new Promise((reso, rej)=>{
                    fetch(`http://localhost:5000/user/${leave.empID}`, {
                        method: "GET",
                        headers:{
                            // "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        credentials: 'include',
                    })
                    .then((res)=>{
                        return res.json();
                    })
                    .then((data)=>{
                        const user=data.user;
                        console.log("fetched user in promise: ", user);
                        const leaveWithUser={...leave, user};
                        updatedLeaves.push(leaveWithUser);
                        reso(updatedLeaves);
                    })
                    .catch((err)=>{
                        rej(err);
                    })
                })
                
            })
            Promise.all(promiseArray)
            .then((val)=>{
                console.log("Before updating leaves: ",updatedLeaves);
                setLeaves(updatedLeaves);
                setUpdate(true);
                console.log(val);
            })
            .catch((err)=>{
                console.log("promise error " ,err);
            })
        }
    }, [shouldRun]);

    const handleAcceptOrReject=({id, status, comment})=>{
        console.log("handle accept or reject");
        const updatedLeaves=leaves.map(async(leave)=>{
            try{
                if(id==leave._id){
                    console.log(leave);
                    try{
                        await statusUpdate({...leave, status: status, comment: comment});
                    }catch(err){
                        console.log(err);
                    }
                    return {...leave, status: status, comment: comment};
                }
            }catch(err){
                console.log(err);
            }
            return leave;
        });

        Promise.all(updatedLeaves).then((resolvedLeaves)=>{
            setLeaves(resolvedLeaves);
        }).catch((err=>{
            console.log(err);
        }))
    }
    useEffect(()=>{
        console.log("useEffect solely for leaves: ", leaves);
    }, [leaves]);
            
    const statusUpdate=async(leave)=>{
        try{
            console.log("..... ", leaves);
            console.log("leave looks like: ", leave)
            const res=await fetch(`http://localhost:5000/leave/${leave._id}`, {
                method: "PUT",
                headers:{
                    // "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    leave
                })
            })
            const data=await res.json();
            if(!(res.status===201)){ 
                throw new Error("Error updating leaves");
            }
        }catch(err){
            console.log(err);
        }
    }
    const handleReject=(e, id)=>{
        e.preventDefault();
        const comment=e.target.elements.comment.value;
        handleAcceptOrReject({id, status: "Rejected", comment});
    }
    return (
        <div>
            {(!update)?
                <h2>No new Requests</h2>:
                <div className='container'>
                    <h2>Requests are shown here: </h2>
                    {leaves.map((leave)=>{
                        if(leave.status=="Pending"){
                        return(
                            <div className="card container" style={{margin: "5px"}} key={leave._id}>
                                <div className='row'>
                                    <div className='col-md-1'>
                                        <img style={{width: "5rem"}} src={userImage} alt="Avataar"/>
                                        <div style={{clear: "both"}}></div>
                                    </div>
                                    <div className='col-md-11 card-body'>
                                        <div className="row">
                                            <p className='col-md-4'><strong>Name</strong>: {leave.user.firstname} {leave.user.middlename} {leave.user.lastname}</p>
                                            <p className='col-md-4'><strong>Leave Type:</strong> {leave.leaveType}</p>
                                        </div>
                                        <div className='row'>
                                            <p className='col-md-4'><strong>From: </strong> {leave.startDate}</p>
                                            <p className='col-md-4'><strong>To: </strong> {leave.endDate}</p>
                                        </div>
                                        <div className='row'>
                                            <p className='col-md-9'>{leave.reason}</p>

                                            <button onClick={()=>handleAcceptOrReject({id: leave._id, status: "Approved", comment: ""})} className='btn btn-success col-md-2'>Accept</button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-1'>{leave.status}</div>
                                    <form onSubmit={(event)=>handleReject(event, leave._id)} className='col-md-11 ' style={{marginBottom: "5px"}}>
                                        <div className='row'>
                                            <div className="form-group col-md-8">
                                                <label htmlFor="comment">Comment: </label>
                                                <input type="textarea" name="comment" />
                                            </div>
                                            <div className='col-md-1'></div>
                                            <button type="submit" style={{height: "40px", marginTop: "20px"}} className="col-md-2 btn btn-danger" >Reject</button>
                                        </div>
                                    </form>
                                </div>
                                
                            </div>
                            
                        )}
                    })   
                    }
                </div>
            }
        </div>
    )
}

export default LeaveReq

