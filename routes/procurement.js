const express = require('express');
const router = express.Router();
const Procurement = require('../models/Procurement');
const verify = require('./verifyToken')



router.get('/', async (req,res)=>{
    
    res.send('Procurement Route is grafting!');

});

//GET ALL PFIs
router.get('/allPfis', async (req,res)=>{

    try {
        const allPfis = await Procurement.find();
        res.json({

            status: 'Successfully retreived PFIs!',
            data: allPfis
            
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });


 //CREATE NEW PFIs
router.post('/addNewPfi', async (req,res) => {
    
     try {  
        const newPfi = new Procurement({
        
        purchaseOrderNumber: req.body.purchaseOrderNumber,
        pfiNumber: req.body.pfiNumber,
        supplierName: req.body.supplierName,
        supplierEmail: req.body.supplierEmail,
        issuedDate: req.body.date,
        status: req.body.status
                
        });

           
     
        console.log(newPfi);
       
       const savedPfi = await newPfi.save();
         console.log(savedPfi);
             res.json({
                
                 Message: 'Successfully added a new PFI !',
                 data: savedPfi
             });
         } catch (err) {
              res.json({ message: err })
         }
});

module.exports= router