const Employee=require('../models/empSchema');
const jwt=require('jsonwebtoken');

const authenticate=async(req, res, next)=>{
    console.log("reached authenticate");
    try{
        const token=req.cookies.jwtoken;
        if(!token){
            throw new Error("No token found to login!")
        }
        const verifyToken=jwt.verify(token, process.env.SECRET_KEY);

        const rootEmployee=await Employee.findOne({_id: verifyToken._id});
        if(!rootEmployee){
            throw new Error("User not found!! Login again");
        }
        req.token=token;
        req.rootEmployee=rootEmployee;
        req.EmployeeID=rootEmployee._id;
        next();
    }catch(err){
        console.log("Login first to access");
        console.log(err.message);
        return res.status(401).send({error: err.message});
        
    }
}
module.exports=authenticate;