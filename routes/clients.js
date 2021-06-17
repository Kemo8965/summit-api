const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const verify = require('./verifyToken')
router.get('/', async (req,res)=>{
  
    res.send('Clients Route is grafting!');

});

//GET ALL USERS
router.get('/allClients', async (req,res)=>{
    try {
        const allClients = await Client.find();
        res.json({

            status: 'Successfully retreived clients!',
            data: allClients
            
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });


 //CREATE NEW CLIENT
router.post('/individualClient', async (req,res) => {
    
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
                
                 Message: 'Successfully added a new client!',
                 data: savedClient
             });
         } catch (err) {
              res.json({ message: err })
         }
});

module.exports= router