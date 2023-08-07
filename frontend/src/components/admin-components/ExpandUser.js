import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

function ExpandUser() {
  const {id}=useParams();
  const navigate=useNavigate();
  const [user, setUser]=useState({
    firstname:"",
    middlename: "",
    lastname: "",
    email:"",
    phone:"",
    leaves: {
      casual: 0,
      paid: 0
    },
    dob:"",
    specialization: "",
    department:"",
    gender: "",  
  });
  const getUser = async()=>{
    try{
      const res=await fetch(`http://localhost:5000/user/${id}`, {
          method: "GET",
          headers:{
              // "Accept": "application/json",
              "Content-Type": "application/json"
          },
          credentials: 'include',
      })
      const data=await res.json();
      if(!(res.status===201)){ 
          throw new Error("ERROR AT FETCHING DETAILS");
      }
      // console.log(data.user.leaves.paid);
      setUser(data.user);
      
    }catch(err){
      console.log(err);  
    }
  }

  const deleteUser=async(e)=>{
    e.preventDefault();
        try{
            const res=await fetch(`http://localhost:5000/user/${id}`, {
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
                window.alert("Deleted User");
                navigate('/admin/user');
            }
        }catch(err){
            console.log(err);
        }
  }
  useEffect(()=>{
    window.scrollTo(0,0);
    getUser();
    
  },[]);
  // console.log("casual leaves: ", user.leaves.casual);

  return (
    <div className="container">
        <div>
        <Link to="edit" state={user}>Edit</Link>
        <button onClick={deleteUser} className="btn btn-danger"> Delete User</button>
          <p><span>ID: </span> <span> {user._id}</span></p>
          <p><span>Name: </span> <span>{user.firstname} {user.middlename} {user.lastname}</span></p>
          <p><span>Email: </span> <span>{user.email}</span></p>
          <p><span>Date Of Birth: </span> <span>{user.dob}</span></p>
          <p><span>Contact No. : </span> <span>{user.phone}</span></p>
          <p><span>Casual Leaves : </span> <span>{user.leaves.casual || 0}</span></p>
          <p><span>Paid Leaves : </span> <span>{user.leaves.paid|| 0}</span></p>
          <p><span>Gender: </span> <span>{user.gender}</span></p>
          <p><span>Specialization: </span> <span>{user.specialization}</span></p>
          <p><span>Department: </span> <span>{user.department}</span></p>
        </div>
      </div>
  )
}

export default ExpandUser