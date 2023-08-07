const express = require("express");
const router  = express.Router();
const mongoose=require('mongoose');
const Employee=require('../models/empSchema');
const authenticate=require('../middlewares/authenticate');
const hasAdminPrivilige= require('../middlewares/hasAdminPrivilige');
const Research=require('../models/researchSchema');

router.post("/research", async(req, res)=>{
    console.log("research recieved is: ", req.body.research);
    try{
        const newResearch=new Research(req.body.research);
        await newResearch.save();
        return res.status(201).json({message: "Research Added"});
    }catch(err){
        console.log("Error: ", err);
    }
})

// fetch all researches of an employee
router.get("/employee/:empID/research", async(req,res)=>{
    console.log("fetching all researches of an employee");
    try{
        console.log("fetching for id: ", req.params.empID)
        const researches=await Research.find({empID: mongoose.Types.ObjectId(req.params.empID)});
        console.log(researches);
        if(researches.length===0){
            console.log("no research found");
            return res.status(204);
        }
        res.status(200).json({researches: researches});
    }catch(err){
        console.log(err);
    }
})

router.get("/research/:id", async(req, res)=>{
    console.log("research fetch request recieved");
    try{
        const research=await Research.findById(req.params.id);
        if(research==null){
            return res.status(204);
        }
        console.log(research);
        res.status(200).json({research});
    }catch(err){
        console.log(err);
    }
})

module.exports=router;