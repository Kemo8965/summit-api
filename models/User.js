
const mongoose = require('mongoose');
const moment = require('moment');
const tz = require ('moment-timezone');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        max: 255,
        min: 2
    },
    email:{
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password:{
        type: String,
        required: true,
        max:1024,
        min:8 
    },
    
    role:{
             admin:{
                type: String,
                default: 'admin'
             },
             proc:{
                type: String,
                default: 'procurement'
             },
             comp:{
                type: String,
                default: 'compliance'
             },
             fin:{
                type: String,
                default: 'finance'
             }
              
        
        
    },

    date: {         
        type:String,
      // default: moment().utc().format('dddd, MMMM Do YYYY, h:mm:ss a zz') 
      default: moment().tz("Africa/Lusaka").format('dddd, MMMM Do YYYY') 
      
      // default: moment().tz('America/Los_Angeles').format('dddd, MMMM Do YYYY, h:mm:ss a zz')         
    },
});

module.exports= mongoose.model('Users', UserSchema);