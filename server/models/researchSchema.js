const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');

const researchSchema=mongoose.Schema({
    empID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: String,
    },
    applicationProcess: {
        type: String,
    },
    duration: {
        type: String,
    },
    contactEmail:{
        type: String
    },
    contactNumber: {
        type: String
    },
    additionalInfo: {
        type: String
    },
    benefits: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    postingDate:{
        type: Date,
        required: true
    },
    // displayStatus: {
    //     type: String,
    //     required: true
    // }

})

const Research=mongoose.model('RESEARCH', researchSchema);
module.exports=Research;

// empID Title description requirements benefits applicationProcess estimatedPeriod contact information