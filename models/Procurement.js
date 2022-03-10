const moment = require('moment');
const mongoose = require('mongoose');
const tz = require ('moment-timezone')
const luxon = require ('luxon')


const ProcurementSchema = new mongoose.Schema({
        purchaseOrderNumber:{
            type: Number,
            required: true
        },
        pfiNumber:{
            type: Number,
            required: true
        },
        supplierName:{
            type: String,
            required: true
        },
        supplierEmail:{
            type: String,
            required: true
        },
        date: {         
            type:String,
          // default: moment().utc().format('dddd, MMMM Do YYYY, h:mm:ss a zz') 
          default: moment().tz("Africa/Lusaka").format('dddd, MMMM Do YYYY') 
          
          // default: moment().tz('America/Los_Angeles').format('dddd, MMMM Do YYYY, h:mm:ss a zz')         
        },

        status:{
            
               procurement:{
                type: String,
                default:'Sent to Compliance'
               },

               compliance:{
                type: String,
                default:'Received from Procurement'
               }
           
           
        }
        
        
});

module.exports= mongoose.model("Procurement", ProcurementSchema);