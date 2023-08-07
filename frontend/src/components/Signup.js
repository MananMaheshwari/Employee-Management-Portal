import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import SignUpImage from '../images/SignUp4.jpg'

const Signup = () => {
    const navigate=useNavigate();
    const [employee, setEmployee]=useState({
        firstname:"",
        middlename: "",
        lastname: "",
        email:"",
        phone:"",
        dob:"",
        specialization: "",
        department:"",
        gender: "",
        password:"",
        cpassword:""
    })
    const handleInput=(e)=>{
        console.log(e);
        setEmployee({...employee, [e.target.name]: e.target.value});
    }
    const formSubmit = async(e)=>{
        e.preventDefault();
        const {firstname, middlename, lastname, email, phone, dob, specialization, department, gender, password, cpassword}=employee;
        const res= await fetch("/signup", {
            method: "POST",
            headers:{
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                firstname, middlename, lastname, email, phone, dob, specialization, department, gender, password, cpassword
            })
        })
        const data=await res.json(); 
        if( res.status===422 || !data){
            window.alert(data.error);
        } 
        else{
            window.alert("details submitted for registration");
            navigate("/home");
        }
    };
    return (
    <div style={{ height: "100%", padding: "30px", backgroundColor:"mintcream"}}>    
        <div className="container" style={{height: "100%"}}>
            <div className='row'>
                <div className='col-md-6'>
                    <img style={{width: "100%", height: "100%", objectFit:"fill"}} src={SignUpImage} alt="Sign Up Pic"/>
                </div>
                <div className='col-md-6' style={{margin: "auto"}}>
                    <h1 style={{textAlign: "center"}}>Let's Get you Started !</h1>
                    <fieldset  className='border border-primary border-2 rounded-3 p-3'>
                    <legend className='float-none w-auto px-2 text-primary'>New Employee Form: </legend>
                    <form method="POST" onSubmit={formSubmit}>
                        <div className='row'>
                            <div className="form-group col-md-4">
                                <label for="firstname">First Name: </label>
                                <input type="text" name="firstname" value={employee.firstname} id="firstname" onChange={handleInput} className="form-control" placeholder="First Name"/>
                            </div>
                            <div className="form-group col-md-4">
                                <label for="middlename">Middle Name: </label>
                                <input type="text" name="middlename" value={employee.middlename} id="middlename" onChange={handleInput} className="form-control" placeholder="Middle Name"/>
                            </div>
                            <div className="form-group col-md-4">
                                <label for="lastname">Last Name: </label>
                                <input type="text" name="lastname" value={employee.lastname} id="lastname" onChange={handleInput} className="form-control" placeholder="Last Name"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="email">Email: </label>
                            <input type="email" name="email" value={employee.email} onChange={handleInput} className="form-control" id="email" placeholder="Enter email"/>
                        </div>
                        <div className='row'>
                            <div className="form-group col-md-4">
                                <label for="phone">Phone: </label>
                                <input type="number" name="phone" value={employee.phone} onChange={handleInput} className="form-control" id="phone" placeholder="Enter phone number"/>
                            </div>
                            <div className="form-group col-md-4">
                                <label for="dob">DOB: </label>
                                <input type="date" name="dob" value={employee.dob} onChange={handleInput} className="form-control" id="dob"/>
                            </div>
                            <div className="form-group col-md-4">
                                <label for="gender">Gender: </label>
                                <input type="text" name="gender" value={employee.gender} id="gender" onChange={handleInput} className="form-control" placeholder="M/F/O"/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-md-6">
                                <label for="specialization">Specialization: </label>
                                <input type="text" name="specialization" value={employee.specialization} id="specialization" onChange={handleInput} className="form-control" placeholder="Specialization Field"/>
                            </div>
                            
                            <div className="form-group col-md-6">
                                <label for="department">Department: </label>
                                <input type="text" name="department" value={employee.department} id="department" onChange={handleInput} className="form-control" placeholder="Department Assigned"/>
                            </div>
                        </div>
                        
                        
                        
                        <div className="form-group">
                            <label for="password">Password: </label>
                            <input type="password" name="password" value={employee.password} onChange={handleInput} className="form-control" id="password" placeholder="Type a password"/>
                        </div>
                        <div className="form-group">
                            <label for="cpassword">Confirm Password: </label>
                            <input type="password" name="cpassword" value={employee.cpassword} onChange={handleInput} className="form-control" id="cpassword" placeholder="Confirm Password"/>
                        </div>
                        <button style={{margin: "5px"}} type="submit" onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </form>
                    </fieldset>
                </div>

            </div>
            
        </div>
    </div>
  )
}
export default Signup