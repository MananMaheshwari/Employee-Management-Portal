import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from '../../images/userImage.png'

const Profile = (props) => {
  
  if(!props.isUser){
    return (
      <h2>Profile Page !!!</h2>
    );
  }else{
    return(
      <div className="container" style={{height: "100%", backgroundColor: "mintcream", padding: "30px"}}>
        <div className='row' style={{height: "100%", padding: "20px"}}>
          <div className='col-md-6' >
            <div style={{ padding: "20px",height: "66%", boxShadow: "5px 5px 5px 5px darkgray", backgroundColor: "ivory",margin: "20px",borderRadius: "20%"}}>
              <div style={{margin: "auto", textAlign: "center"}}>
                <img style={{width: "20%"}} src={userImage} alt="profile image"/>
              </div>
              <div className="row" style={{margin: "20px"}}>
                <div className='col-md-1'></div>
                <div className='col-md-10'>
                    <p><strong>Employee ID:</strong> <span> {props.user._id}</span></p>
                    <p><strong>Name:</strong> <span>{props.user.firstname} {props.user.middlename} {props.user.lastname}</span></p>
                    <p><strong>Role/Dept.: </strong> <span> {props.user.role} / {props.user.department}</span></p>
                    <p><strong>Date Of Birth:</strong> <span>{props.user.dob}</span></p>
                    <p><strong>Gender:</strong> <span>{props.user.gender}</span></p>  
                </div>
                <div className='col-md-1'></div>
              </div>
            </div>
            <div style={{margin: "20px", boxShadow: "5px 5px 5px 5px darkgray", backgroundColor: "ivory", height: "30%", padding: "20px", borderRadius: "20px"}}>
              <h2 >Remaining Leaves: </h2>
              <p><strong>Casual Leave: </strong> <span>{props.user.casualLeaves}</span></p>
              <p><strong>Paid Leave: </strong> <span>{props.user.paidLeaves}</span></p> 
            </div>
            
          </div>
          <div className='col-md-6'>
            <div style={{height: "33%",boxShadow: "5px 5px 5px 5px darkgray", borderRadius: "20px",backgroundColor : "ivory", margin: "20px", padding: "20px"}}>
              <h2>Contact Details: </h2>
              <p><strong>Email Address: </strong> <span>{props.user.email}</span></p>
              <p><strong>Contact No. :</strong> <span>{props.user.phone}</span></p>
              <p><strong>Office Address:</strong> <span> 211, Academic Block-A, 2nd Floor</span></p>
            </div>
            <div style={{boxShadow: "5px 5px 5px 5px darkgray", borderRadius: "20px",height: "63%",margin: "20px", backgroundColor: "ivory"}}>

            </div>
          </div>
        </div>
      </div>
    );
  } 
  
}

export default Profile