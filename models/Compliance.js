const moment = require('moment');
const mongoose = require('mongoose');
const tz = require ('moment-timezone')

//---- AMENDED PERMIT APPLICATION SCHEMA---//
const AmendedPermitApplications = new mongoose.Schema({

        pfiNumber:{
                type: Number,
                required: true
            },

        reasonForAmendment:{
            type: String,
            required: true
        },

        date:{
            type: String,
            default: moment().tz("Africa/Lusaka").format('dddd, MMMM Do YYYY') 
        }

      
       
        
        
});


//--- PERMIT SCHEMA---------//

const Permits = new mongoose.Schema({

        pfiNumber:{
                type: Number,
                required: true
            },

        permitNumber:{
            type: String,
            required: true
        },

        supplierName:{
            type: String,
            required: true
        },
        date:{
            type: String,
            default: moment().tz("Africa/Lusaka").format('dddd, MMMM Do YYYY') 
        }, 

  
   
    
    
});


//---- PERMIT APPLICATION SCHEMA---//
const PermitApplications = new mongoose.Schema({

    supplierName:{
        type: String,
        required: true
    },

    
    pfiNumber:{
        type: String,
        required: true
    },
    selectCurrency:{
        type: String,
        required: true
    },

    pfiValue:{
        type: Number,
        required: true
    },

    
    exchangeRate:{
        type: Number,
        required: true
    },

    localCurrency:{
        type: Number,
       


    },

    marketAuthFee:{
        type: Number,
        
    },

    marketNonAuthFee:{
        type: Number,
       
    },

    feeType:{
        type: String,
        required:true
    },

    authBody:{
        type: String,
        required: true
    },

    date:{
        type: String,
        default: moment().tz("Africa/Lusaka").format('dddd, MMMM Do YYYY') 
    }, 


  

    

    permitStatus:{
       
            type: String,
            default: "Pending"
        

    }


})





const AmendedPermitApplicationsSchema = mongoose.model("Amended Permit Applications", AmendedPermitApplications);
const PermitApplicationsSchema = mongoose.model("Permit Applications", PermitApplications);
const PermitsSchema = mongoose.model("Permits", Permits)

module.exports = { APAs: AmendedPermitApplicationsSchema, PAs: PermitApplicationsSchema, Ps: PermitsSchema }