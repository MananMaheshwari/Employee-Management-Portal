const express = require("express");
const router  = express.Router();
const mongoose=require('mongoose');
const SignupReq=require('../models/signUpReq');
const Employee=require('../models/empSchema');
const bcrypt=require('bcryptjs');
const authenticate=require('../middlewares/authenticate');
const hasAdminPrivilige= require('../middlewares/hasAdminPrivilige');
const Leave=require('../models/leaveSchema');

router.get('/leave', async(req, res)=>{
    const leaves=await Leave.find({status: "Pending"});
    console.log(leaves);
    res.status(200).json({leaves});
})
router.post('/leave', async(req, res)=>{
    console.log("req recieved");
    console.log(req.body);
    req.body.status="Pending";
    const leave=new Leave(req.body);
    await leave.save();
    res.status(200).json({message: "Recieved successfully"});
})
router.put('/leave/:id', async(req, res)=>{
    console.log("update request");
    try{
        console.log(req.body.leave);
        const leave=await Leave.findByIdAndUpdate({_id: req.params.id}, req.body.leave, {new: true});
        const employee=await Employee.findById({_id:mongoose.Types.ObjectId(req.body.leave.empID)});
        if(!employee){
            throw new Error("No employee corresponding to mentioned empID");
        }
        console.log("employee fetched is: ", employee);
        if(req.body.leave.leaveType==="casual"){
            employee.leaves.casual-=req.body.leave.days;
        }
        else if(req.body.leave.leaveType==="paid"){
            employee.leaves.paid-=req.body.leave.days;
        }
        await employee.save();
        console.log("employee updated is: ", employee);
 
        console.log("updated leave is", leave);
        res.status(201).json({message: "updated leave details"})    
    }catch(err){
        console.log(err);
    }
})
router.get('/allLeaves/:empID', async(req,res)=>{
    console.log("req recieved for all leaves");
    try{
        const leaves=await Leave.find({empID: req.params.empID});
        console.log('leaves are: ', leaves)
        res.status(200).json({leaves});
    }catch(err){
        console.log(err);
    }
})

module.exports=router;