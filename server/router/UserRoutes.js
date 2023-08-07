const express = require("express");
const router  = express.Router();
const mongoose=require('mongoose');
const SignupReq=require('../models/signUpReq');
const Employee=require('../models/empSchema');
const bcrypt=require('bcryptjs');
const authenticate=require('../middlewares/authenticate');
const hasAdminPrivilige= require('../middlewares/hasAdminPrivilige');

//create new User
router.post("/user", async(req, res)=>{
    console.log("inside user route");
    const {firstname, middlename, lastname, email, phone, casualLeave, paidLeave, role, specialization,dob, department, gender, password}=req.body.empreq;
    const leaves={
        casual: casualLeave,
        paid: paidLeave
    }
    const newEmployee= new Employee({firstname, middlename, lastname, email, phone, leaves, role, specialization, dob, department, gender, password});
    try{
        await newEmployee.save();  
        const id=mongoose.Types.ObjectId(req.cookies["additionalData"]);
        await SignupReq.findByIdAndDelete(id);
        console.log("deleted");
        return res.status(201).json({message: "Successfully created Employee Record"});
    }catch(err){
        console.log("ERROR: ", err);
    }
        
})

//get a specific user
router.get("/user/:id", async(req, res)=>{
    try{
        console.log("user req recieved");
        // console.log(req);
        const user=await Employee.findById({_id: mongoose.Types.ObjectId(req.params.id)});
        console.log(req.params.id);
        if(user){
            console.log(user);
            res.status(201).json({user: user});
        }
        else{
            console.log("no user found");
        }
    }catch(err){
        console.log(err);
    }
})
router.put("/user/:id", async(req, res)=>{
    console.log("req for update received");
    try{
        const user=await Employee.findByIdAndUpdate({_id: req.params.id}, req.body.details, {new: true});
        console.log("Modified User: ", user);
        res.status(201).json({user});
    }catch(err){
        console.log(err);
    }
})
//user details of the user logged in
router.get("/getUserDetails", authenticate, (req, res)=>{
    const {firstname, middlename, lastname, email, phone, leaves, role, specialization, dob, department, gender}=req.rootEmployee;
    const user={
        _id: req.EmployeeID, firstname, middlename, lastname, email, phone, leaves, role, specialization, dob, department, gender
    }
    return res.status(201).json({user: user});
});

//show all users
router.get("/user", async(req, res)=>{
    console.log("reached the show all user route");
    const users=await Employee.find({});
    if(users){
        console.log(users);
        res.status(201).json({users});
    }
    else{
        console.log("No users");
    }
})

router.delete("/user/:id",  async(req, res)=>{
    const data=await Employee.findByIdAndDelete(req.params.id);
    if(!data){
        res.status(422).json({error: "No request present with the given id"});
    }
    else{
        res.status(204).json({message: "Successful"});
    }
})

module.exports=router;