const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

router.get('/', async (req,res)=>{
  
    res.send('Clients Route is grafting!');

});

 //CREATE NEW CLIENT
router.post('/individualClient', async (req,res) => {
    
     try {  
        const newClient = new Client(req.body);
     
        console.log(registeredUser);
        
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