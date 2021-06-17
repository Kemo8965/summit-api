const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const verify = require('./verifyToken')
router.get('/', async (req,res)=>{
  
    res.send('Clients Route is grafting!');

});

 //CREATE NEW CLIENT
router.post('/individualClient',verify, async (req,res) => {
    
     try {  
        const newClient = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        maritalStatus: req.body.maritalStatus,
        idNumber: req.body.idNumber,
        idType: req.body.idType,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        residentialAddress: req.body.residentialAddress
        });
     
        console.log(newClient);
        
       const savedClient = await newClient.save();
         console.log(savedClient);
             res.json({
                
                 status: 'Successfully added a new client!'
             });
         } catch (err) {
              res.json({ message: err })
         }
});

module.exports= router