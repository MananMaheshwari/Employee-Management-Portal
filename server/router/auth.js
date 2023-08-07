const express=require('express');
const router=express.Router();
const cors=require('cors');
const cookieParser=require('cookie-parser');
router.use(cookieParser());
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
const getDays=require('../helper_functions/getWorkingDays');

const SignupReq=require('../models/signUpReq');
const Employee=require('../models/empSchema');
const bcrypt=require('bcryptjs');
const authenticate=require('../middlewares/authenticate');
const hasAdminPrivilige= require('../middlewares/hasAdminPrivilige');
// const { default: getWorkingDays } = require('../helper_functions/getWorkingDays').default;

router.get('/', (req, res)=>{
    res.send("successful response");
})





router.post("/get_days", (req, res)=>{
    const {sDate, eDate}=req.body;
    console.log("number of working days are: "+getDays(sDate, eDate));
    // res.status(200).json("Number of days are: ", getDays(sDate, eDate));
})

// apply for leave
// router.post("/apply_for_leave", authenticate, (req, res)=>{
//     res.send("authentication successful");
//     // const {sDate, eDate}=req.body;
// })

module.exports=router;