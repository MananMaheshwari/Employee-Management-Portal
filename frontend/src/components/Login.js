import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import avatar from '../images/userImage.png';
import LoginImage from '../images/login4.jpg'

const Login = ({updateIsAdmin}) => {
    console.log("Login Renders");
    const navigate=useNavigate();
    const handleInput=(e)=>{
        console.log(e);
        setEmployee({...employee, [e.target.name]: e.target.value});
    }
    const [employee, setEmployee]=useState({
        email: "",
        password: ""
    })
    const formSubmit=async(e)=>{
        e.preventDefault();
        const {email, password}=employee;
        try{
            const res= await fetch("/login", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    email,password
                })
            })
            const data=await res.json();
            if(res.status!==200){
                throw new Error(data.error)
            }
            else{
                const val=(('; '+document.cookie).split(`; isAdmin=`).pop().split(';')[0]);
                updateIsAdmin(val);
                window.alert(data.message);
                navigate("/");
            }
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div style={{height: "100%",backgroundColor:"mintcream"}}>
        <div className="container " style={{height: "100%"}}>
            <div className='row'>
                <div className='col-md-6'>
                    <img style={{width: "100%", height: "100%", objectFit:"fill"}} src={LoginImage} alt="Login Pic"/>
                </div>
                <div className='col-md-6' style={{margin: "auto"}}>
                    <h1 style={{textAlign: "center"}}>Welcome User</h1>
                    <fieldset className='border border-primary border-2 rounded-3 p-3'>
                        <legend className='float-none w-auto px-2 text-primary'>Login: </legend>
                        <img className="avatarimg" src={avatar} alt="Login Avatar"/>
                        <form method="POST" onSubmit={formSubmit}>
                            <div className="form-group">
                                <label for="email">Email: </label>
                                <input type="text" name="email" value={employee.email} id="email" onChange={handleInput} className="form-control" placeholder="your email here"/>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label for="password">Password: </label>
                                <input type="password" name="password" value={employee.password} id="password" onChange={handleInput} className="form-control"/>
                            </div>
                            <br/>
                            <div className='text-center'>
                                <button className="text-center btn btn-primary" onClick={formSubmit}>Submit</button>
                            </div>
                        </form>
                        <br/>
                        <p className='text-center'>Don't have an account yet? <Link className="" to="/signup">Sign Up</Link></p>
                    </fieldset>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Login