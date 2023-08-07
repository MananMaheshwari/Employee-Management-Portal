const express = require("express");
const router  = express.Router();

const SignupReq=require('../models/signUpReq');
const Employee=require('../models/empSchema');
const bcrypt=require('bcryptjs');
const authenticate=require('../middlewares/authenticate');
const hasAdminPrivilige= require('../middlewares/hasAdminPrivilige');

// fetching all the signup requests
router.get("/signupReq",hasAdminPrivilige, async(req, res)=>{
    try{
        const signups=await SignupReq.find({});

        if(signups){
            return res.status(200).json({signups});
        }
    }catch(err){
        console.log(err);
    }
})
//fetching a specific signup request
router.get("/signupReq/:id", hasAdminPrivilige, authenticate, async(req, res)=>{
    try{
        console.log("req recieved for user")
        const request=await SignupReq.findById(req.params.id);
        if(request){
            console.log(request);
            return res.status(200).json({request: request});
        }
        res.status(404).json({error: "No such request"});
    }catch(err){
        console.log(err);
    }
})

//approving the signup req and creating a user
router.post("/signupReq/:id", hasAdminPrivilige, async(req, res)=>{
    try{
        const request=await SignupReq.findById(req.params.id);
        if(request){
            const {firstname, middlename, lastname, email, phone, casualLeave, paidLeave, role, specialization,dob, department, gender, password}=req.body.empreq;
            if(!firstname || !lastname || !email || !phone || !casualLeave || !paidLeave || !role || !specialization|| !dob || !department || !gender || !password){
                console.log("failed");
                return res.status(422).json({error: "All fields are not filled"});
            }
            const existEmployee=await Employee.findOne({email: email});
            if(existEmployee){
                console.log(existEmployee);
                console.log("checking existing emp");
                return res.status(422).json({message: "Employee already registered with this email"});
            }
            console.log("redirecting route to user");
            res.cookie("additionalData", req.params.id, {httpOnly: true});
            res.redirect(307,'/user');
        }
        else{
            res.status(404).json({error: "no such request present"});
        }
        

    }catch(err){
        console.log(err);
    }
})

//delete a signup req
router.delete("/signupreq/:id", hasAdminPrivilige, async(req, res)=>{
    const data=await SignupReq.findByIdAndDelete(req.params.id);
    if(!data){
        res.status(422).json({error: "No request present with the given id"});
    }
    else{
        res.status(204).json({message: "Successful"});
    }
})

module.exports=router;