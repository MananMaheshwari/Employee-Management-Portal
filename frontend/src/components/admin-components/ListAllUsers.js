import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import userImage from '../../images/userImage.png';

const ListAllUsers = () => {
  const [users, setUsers]=useState([]);
  const navigate=useNavigate();
  const getUsers=async()=>{
    
      try{
          const res=await fetch('http://localhost:5000/user', {
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
          if(!(res.status===201)){ 
              throw new Error(data.error);
          }
          setUsers(data.users);
      }catch(err){
          alert("You are not authorized"+ err.message); 
          navigate("/login");
          
      }
  }
  useEffect(()=>{
      getUsers();
  },[]);

  if(!users){
      return(
          <h2>Loading...</h2>
      )
  }
  const showDetails=(id)=>{
    navigate(`/admin/user/${id}`);
  }
  return (
  <div className='container' style={{boxSizing: "border-box", backgroundColor: "#F0F0F0", padding: "10px"}}>
      {users.map((user)=>{
          return(
            <div  style={{borderRadius: "10px",border: "1px solid", margin: "10px", backgroundColor: "ivory"}} onClick={()=>showDetails(user._id)} key={user._id}>
                <div className='row' style={{ padding: "5px", margin:"10px"}}>
                    <div className='col-md-1'>
                        <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={userImage} alt="user pic"/>
                    </div>
                    <div className='col-md-11' style={{margin: "auto"}}>
                        <div className='row'>
                            <p className='col-md-6'><strong>Name: </strong>{user.firstname} {user.middlename} {user.lastname}</p>
                            <p className='col-md-6'><strong>Position: </strong>{user.role}</p>
                        </div>
                        <div className='row'>
                            <p className='col-md-6'><strong>Specialization: </strong>{user.specialization}</p>
                            <p className='col-md-6'><strong>Department: </strong>{user.department}</p>
                        </div>
                    </div>    
                </div>
            </div>
          )
      })}
  </div>
  )
}

export default ListAllUsers