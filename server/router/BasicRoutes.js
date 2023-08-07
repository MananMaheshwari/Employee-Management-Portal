const express = require("express");
const router  = express.Router();

const SignupReq=require('../models/signUpReq');
const Employee=require('../models/empSchema');
const bcrypt=require('bcryptjs');
const authenticate=require('../middlewares/authenticate');
const hasAdminPrivilige= require('../middlewares/hasAdminPrivilige');

router.post("/login", async (req, res)=>{
    const {email, password} =req.body;
    if(!email || !password){
        return res.status(400).json({error: "Fill all the fields"});
    }
    const userLogin=await Employee.findOne({email: email});
    if(userLogin){
        const isMatch=await bcrypt.compare(password, userLogin.password);
        if(isMatch){
            const token=await userLogin.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now()+1200000),
                // httpOnly: true
            });
            res.cookie("isAdmin", (userLogin.role=="HOD" || userLogin.role=="Acting HOD")? true : false, {
                expires: new Date(Date.now()+1200000),
                // httpOnly: true
            });
            return res.status(200).json({message: "User Login Successful"});
        }
        else{
            return res.status(400).json({error: "Invalid Credentials"});
        }
    }
    else{
        res.status(400).json({error: "invalid credentials"});
    }
});

router.post('/signup', async (req, res)=>{
    try{
        const {firstname, middlename, lastname, email, phone, specialization,dob, department, gender, password, cpassword}=req.body;
        if(!firstname || !lastname || !email || !phone || !specialization || !dob ||!department || !gender || !password || !cpassword){
            return res.status(422).json({error: "All required fields are not filled"});
        }
        if(password!=cpassword){
            return res.status(422).json({error: "passwords are not matching"});
        }
        const reqExist=await SignupReq.findOne({email: email});
        if(reqExist){
            return res.status(422).json({error: "Existing signup request.....waiting to be reviewed!"})
        }
        const empExist=await Employee.findOne({email});
        if(empExist){
            return res.status(422).json({error: "Existing email id....try signing in!!"})
        }
        const salt=await bcrypt.genSalt(10);
        var nDate=new Date(dob).toLocaleDateString();
        const request=new SignupReq({firstname, middlename, lastname, email, phone, specialization, nDate, department, gender, password});
        
        console.log(nDate);
        
        request.dob=nDate;
        console.log(request.dob);
        // var date=nDate.slice(8, 10) + '/' + nDate.slice(5, 7) + '/' + nDate.slice(0, 4); 
        // console.log(date);
        request.password=await bcrypt.hash(request.password, salt);
        // console.log(request.dob);
        await request.save();
        return res.status(201).json({message: "Req submitted successfully"});
    }catch(err){
        console.log(err);
    }
});

module.exports=router;








