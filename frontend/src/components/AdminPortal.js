import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink, Route, Routes } from 'react-router-dom'
import LeaveApply from './dash-components/LeaveApply'
import Profile from './dash-components/Profile'
import ListAllUsers from './admin-components/ListAllUsers';
import GetSignupReq from './admin-components/GetSignupReq';
import ShowSignupReq from './ShowSignupReq';
import ExpandUser from './admin-components/ExpandUser';
import EditUserDetails from './EditUserDetails';
import LeaveReq from './admin-components/LeaveReq';

function AdminPortal() {
    
  return (
    <div>
        <div className='dash-nav text-center'>
            <h3>Admin Portal</h3>
            <nav className="navbar w-100 justify-content-center">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/user">All Users</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/signupRequests">SignUp Requests</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/leaveRequests">Leave Requests</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
        <div className='dash-display'>
            <Routes>
                <Route path="user">
                    <Route index element={<ListAllUsers/>}/>
                    <Route path=":id" element={<ExpandUser/>}/>
                    <Route path=":id/edit" element={<EditUserDetails/> }/>
                </Route>
                <Route path="signupRequests">
                    <Route index element={<GetSignupReq/>}/>
                    <Route path=":id" element={<ShowSignupReq/>}/>
                </Route>
                <Route path="leaveRequests" element={<LeaveReq/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default AdminPortal