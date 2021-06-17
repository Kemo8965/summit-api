const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Client = require('../models/Client');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req,res)=>{
  
       res.send('Posts is grafting');

});

//GET ALL USERS
router.get('/allUsers', async (req,res)=>{
    try {
        const users = await User.find();
        res.json({
            message: users, 
            status: 'Successfully retreived users!'
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });

  //LOGIN USERS
    router.post('/login',async (req,res)=>{

        
      const {error}= loginValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      //CHECK IF EMAIL ALREADY EXISTS
       const user = await User.findOne({ email: req.body.email });
       if(!user) return res.status(400).send('Email is not found');
      

      //CHECK IF USER PASSWORD MATCHES EMAIL
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Password is invalid');
        

    //CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send({ message: 'Logged In!', ID: user._id, token: token});

      res.send('Logged In!');
    
     
        
     
    });

    //LOGOUT USER
    router.get('/logout', async (req,res) => {
        res.header('auth-token', '', { maxAge: 1 });
        res.redirect('/auth/login').send('Logged Out!');
    });

    //REGISTER USER
    router.post('/register',async (req,res)=>{
        const {error}= registerValidation(req.body);
       if (error) return res.status(400).send(error.details[0].message);

    //CHECK IF EMAIL ALREADY EXISTS
       const emailExist = await User.findOne({ email: req.body.email});
    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

       if (emailExist) {
           return res.status(400).send('Email already exists!')
       } else {
           
         //CREATE NEW USERS
          try {  
         const registeredUser= new User({
             name: req.body.name,
             email: req.body.email,
             password: hashPassword
         });
      
         console.log(registeredUser);
         
        const savedUser = await registeredUser.save();
          
              res.json({
                 
                  status: 'Successfully Registered User!'
              });
          } catch (err) {
               res.json({ message: err })
          }
        }
      });

      //CREATE NEW CLIENT
router.post('/create/individualClient', async (req,res) => {
    
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