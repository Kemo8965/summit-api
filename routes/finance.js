const express = require('express');
const router = express.Router();
const Finance = require('../models/Finance');
const verify = require('./verifyToken')



router.get('/', async (req,res)=>{
  
    res.send('Finance Route is grafting!');

});

//GET ALL PFIs
router.get('/allFinReports', async (req,res)=>{
   
    try {
        const allFinReports = await Finance.find();
        res.json({
            

            status: 'Successfully retreived Financial Reports!',
            data: allFinReports
            
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });

 module.exports= router