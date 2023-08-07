import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {NavLink} from 'react-router-dom'

const Navbar = ({isAdmin}) => {
    console.log("Navbar renders");  
  return (
    <>
        <nav className=" navbar navbar-default fixed-top navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Signin</NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/getsignupreq">Signup Requests</NavLink>
                        </li> */}
                        {(isAdmin==="true") ?
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin">Admin Portal</NavLink>
                            </li> : 
                            <p></p>
                            
                        }    
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar