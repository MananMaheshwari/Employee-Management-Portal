const jwt=require('jsonwebtoken');

const hasAdminPrivilige=async(req, res, next)=>{
    try{
        console.log("trying");
        const token=req.cookies.jwtoken;
        if(!token){
            throw new Error("No token found at admin check middleware");
        }
        console.log(token);
        const verifyToken=jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyToken.role);
        if(verifyToken.role==="HOD" || verifyToken.role==="Acting HOD"){
            next();
        }
        else{
            console.log(verifyToken.role);
            throw new Error('Unauthorised Access');
        }
    }catch(err){
        console.log("error at admin privilige")
        console.log(err.message);
        return res.status(401).send({error: err.message});
    }
}
module.exports=hasAdminPrivilige;