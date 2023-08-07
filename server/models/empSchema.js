const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');

const empSchema=mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
    },
    department: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    leaves:{
        casual:{
            type: Number,
            required: true
        },
        paid:{
            type: Number,
            required: true
        },
    },
    password: {
        type: String,
        required: true
    },
    

})
empSchema.methods.generateAuthToken=async function(){
    try{
        let newToken=jwt.sign({_id: this._id, name: this.firstname, role: this.role}, process.env.SECRET_KEY);
        console.log(newToken);
        return newToken;
    }catch(err){
        console.log(err);
    }
}
const Employee=mongoose.model('EMPLOYEE', empSchema);
module.exports=Employee;