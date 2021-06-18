const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
        clientID:{
            type: String,
            required: true
        },
        coverType:{
            type: String,
            required: true
        },
        currency:{
            type: String,
            required: true
        },
        numOfQuarters:{
            type: String,
            required: true
        },
        startDate:{
            type: String,
            required: true
        },
        endDate:{
            type: String,
            required: true
        }, 
        
        sumInsured:{
            type: String,
            required: true
        },
        rate:{
            type: String,
            required:true
        },
        proRata:{
            type: String,
            required:true
        },
        premium:{
            type: String,
            required: true
        },
        totalPremium:{
            type: String,
            required:true
        }
        
});

module.exports= mongoose.model('Policies', PolicySchema);