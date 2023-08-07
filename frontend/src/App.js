import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import{Routes, Route} from 'react-router-dom'
import Signup from './components/Signup'
import Home from './components/Home'
// import GetSignupReq from './components/GetSignupReq'
// import ShowSignupReq from './components/ShowSignupReq'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
// import ListAllUsers from './components/admin-components/ListAllUsers'
import AdminPortal from './components/AdminPortal'
import './App.css'
const App = () => {
  console.log("App.js renders");
  const val=(('; '+document.cookie).split(`; isAdmin=`).pop().split(';')[0]);
  const [isAdmin, setIsAdmin]=useState(val);

  useEffect(()=>{
    setIsAdmin(val);
  }, [val]);
  const updateIsAdmin=(newVal)=>{
    setIsAdmin(newVal);
  }
  return (
    <div style={{height:"100%"}}>
      <Navbar isAdmin={isAdmin} />
      <Routes> 
        <Route path="/" element={<Home/>}/>
        <Route path="dashboard/*" element={<Dashboard/>}/>
        <Route path="admin/*" element={<AdminPortal/>}/>
        <Route path="signup" element={<Signup/>}/>
        {/* <Route path="getsignupreq">
          <Route index element={<GetSignupReq/>}/>
          <Route path=":id" element={<ShowSignupReq/>}/>
        </Route> */}
        <Route path="login" element={<Login updateIsAdmin={updateIsAdmin}/>}/>
      </Routes>
    </div>
    
  )
}
export default App;
