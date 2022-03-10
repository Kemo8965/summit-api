const express = require('express');
const router = express.Router();
const Compliance = require('../models/Compliance');
const { APAs, Ps } = require("../models/Compliance");
const { PAs } = require("../models/Compliance");
const verify = require('./verifyToken')
const cors = require('cors');


router.get('/', cors(), async (req,res)=>{

    res.send('Compliance Route is grafting!');

});

//---------------------------GET ALL PFIs----------------------------------//
router.get('/allCompReports', cors(), async (req,res)=>{

    try {
        const allCompReports = await Compliance.find();
        res.json({

            status: 'Successfully retreived Compliance Records!',
            data: allCompReports
            
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });


 //-------------------GET ALL AMENDED PERMIT APPLICATIONS------------------------//
router.get('/allAmendedPermitApplications', cors(), async (req,res)=>{

    try {
        const allAmendedPermitApplications = await APAs.find();
        res.json({

            status: 'Successfully retreived all amended permit applications!',
            data: allAmendedPermitApplications
            
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });

 //---------------------------AMENDED PERMIT APPLICATIONS----------------------------//

 //------CREATE NEW AMENDED PERMIT APPLICATION----//
router.post('/addNewAmendedPermitApplication', cors(), async (req,res) => {
    
    try {  
       const newAmendedPermitApplication = new APAs({
       
       
       pfiNumber: req.body.pfiNumber,
       reasonForAmendment:req.body.reasonForAmendment,
       amendmentDate: req.body.date        
       });

          
    
       console.log( newAmendedPermitApplication );
      
      const savedAmendedPermitApplication = await newAmendedPermitApplication.save();
        console.log(savedAmendedPermitApplication);
            res.json({
               
                Message: 'Successfully added a new amended permit application !',
                data: savedAmendedPermitApplication
            });
        } catch (err) {
             res.json({ message: err })
        }
});



//--------------------------------- PERMIT APPLICATIONS -----------------------------------------//


 //-----GET ALL PERMIT APPLICATIONS-----//
 router.get('/allPermitApplications', cors(), async (req,res)=>{

    try {
        const allPermitApplications = await PAs.find();
        res.json({

            status: 'Successfully retreived all permit applications!',
            data: allPermitApplications
            
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });

 //-----CREATE NEW PERMIT APPLICATION-------//
router.post('/addNewPermitApplication', cors(), async (req,res) => {
    
    try {  
       const newPermitApplication = new PAs({
       
       
       supplierName: req.body.supplierName,
       pfiNumber:req.body.pfiNumber,

       selectCurrency: req.body.selectCurrency,  
       pfiValue: req.body.pfiValue,
       feeType: req.body.feeType,
       exchangeRate:req.body.exchangeRate,
       localCurrency: (req.body.pfiValue * req.body.exchangeRate).toFixed(2),

       marketAuthFee:(0.015*((req.body.pfiValue * req.body.exchangeRate))).toFixed(2),
       marketNonAuthFee: ((0.05*((req.body.pfiValue * req.body.exchangeRate)))+ 750.00).toFixed(2),

       authBody:req.body.authBody,
           
       });

          
    
       console.log( newPermitApplication );
      
      const savedPermitApplication = await newPermitApplication.save();
        console.log(savedPermitApplication);
            res.json({
               
                Message: 'Successfully added a new permit application !',
                data: savedPermitApplication
            });
        } catch (err) {
             res.json({ message: err })
        }
});



//--------UPDATE A PERMIT APPLICATION------//
router.put('/allPermitApplications/:id', cors(), async (req,res,next )=>{
    try {
        const approvedPA = await PAs.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(){
            PAs.findOne({ _id: req.params.id }).then(function(){
                res.json({

                    status: 'Successfully approved this permit application!',
                    data: approvedPA
                    
                })
            })
        })
       
 
    } catch (error) {
        res.json({ message: error})
    }
 });


 //---------------------------------------------------PERMITS------------------------------------//


 //----------ADD A PERMIT-----//

router.post('/addNewPermit', cors(), async (req,res) => {
    
    try {  
       const newPermit = new Ps({
       
       
       pfiNumber: req.body.pfiNumber,
       permitNumber:req.body.permitNumber,
       supplierName: req.body.supplierName        
       });

          
    
       console.log( newPermit );
      
      const savedPermit = await newPermit.save();
        console.log(savedPermit);
            res.json({
               
                Message: 'Successfully added a new Permit!',
                data: savedPermit
            });
        } catch (err) {
             res.json({ message: err })
        }
});

//-----GET ALL PERMITS-----//
router.get('/allPermits', cors(), async (req,res)=>{

    try {
        const allPermits = await Ps.find();
        res.json({

            status: 'Successfully retreived all Permits!',
            data: allPermits
            
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });


 module.exports= router