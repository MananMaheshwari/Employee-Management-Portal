const mongoose = require('mongoose');

const leaveSchema=mongoose.Schema({
    empID: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    startDate: {
        type:String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    reason:{
        type: String,
    },
    status: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    days:{
        type: Number,
        required: true
    }
})
const leave=mongoose.model('LEAVE', leaveSchema);
module.exports=leave;