import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink, Route, Routes } from 'react-router-dom'
import LeaveApply from './dash-components/LeaveApply'
import Profile from './dash-components/Profile'
import PostResearch from './dash-components/PostResearch';
import ResearchPage from './dash-components/ResearchPage';
import EditResearch from './dash-components/EditResearch';

const Dashboard = () => {
    const navigate=useNavigate();
    const [isUser, setIsUser]=useState(false);
    let [user, setUser]=useState({  
      _id:"",
      firstname:"",
      middlename: "",
      lastname: "",
      email:"",
      phone:"",
      casualLeaves:"" ,
      paidLeaves:"" , 
      dob:"",
      specialization: "",
      department:"",
      gender: ""  
    });
      const getUserDetails = async()=>{
        try{
          console.log("inside Dashboard");
          const res=await fetch(`http://localhost:5000/getUserDetails`, {
              method: "GET",
              headers:{
                  // "Accept": "application/json",
                  "Content-Type": "application/json"
              },
              // mode: 'cors',
              credentials: 'include'
          })
          console.log("status of response is: " + res.status);
          const data=await res.json();
          if(res.status!==201){ 
            console.log("status code error: "+ data.error);
            throw new Error(data.error);
          }

          console.log(data);
          const {_id, firstname, middlename, lastname, leaves, email, phone, dob, specialization, department, gender, role }=data.user
          setUser({
            _id: _id,
            firstname:firstname,
            middlename: middlename,
            lastname: lastname,
            email:email,
            phone:phone,
            casualLeaves: leaves.casual,
            paidLeaves: leaves.paid,
            dob:dob,
            specialization: specialization,
            department:department,
            gender: gender,
            role: role
          });
        console.log("The value of firsname is: " + firstname);
          setIsUser(true);
        //   console.log(user.firstname);
        }catch(err){
          alert("Error: "+ err.message);
          navigate('/login');
        }
        }
      useEffect(()=>{
        getUserDetails();
      },[]);
      console.log("Dashboard says hi");

  return (
    <div style={{height: "100% "}}>
        <div className='dash-nav text-center'>
            <h3>Dashboard: </h3>
            <nav className="navbar w-100 justify-content-center">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard/leave-apply">Apply for Leave</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard/research">Research</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
        <div className='dash-display'>
            <Routes>
                <Route path="profile" element={<Profile user={user} isUser={isUser}/>}/>
                <Route path="leave-apply" element={<LeaveApply user={user}/>} />
                <Route path="research">
                  <Route index element={<ResearchPage user={user}/>}/>
                  <Route path=":id/edit" element={<EditResearch/>}/>
                </Route>
                
            </Routes>
        </div>
    </div>
  )
}

export default Dashboard