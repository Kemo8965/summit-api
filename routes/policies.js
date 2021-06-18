const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');
const verify = require('./verifyToken')
router.get('/', async (req,res)=>{
  
    res.send('Policies Route is grafting!');

});

//GET ALL USERS
router.get('/allPolicies', async (req,res)=>{
    try {
        const allPolicies = await Policy.find();
        res.json({

            status: 'Successfully retreived policies!',
            data: allPolicies
            
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });


 //CREATE NEW POLICY
router.post('/createPolicy', async (req,res) => {
    
     try {  
        const newPolicy = new Policy({
        
        clientID: req.body.clientID,
        coverType: req.body.coverType,
        currency: req.body.currency,
        numOfQuarters: req.body.numOfQuarters,
        startDate: req.body.startDate,
        endDate: req.body.endDate, 
        interest:req.body.interest
        });
     
        console.log(newPolicy);
        console.log(req.body.interest)
       const savedPolicy = await newPolicy.save();
         console.log(savedPolicy);
             res.json({
                
                 Message: 'Successfully added a new policy!',
                 data: savedPolicy
             });
         } catch (err) {
              res.json({ message: err })
         }
});

module.exports= router