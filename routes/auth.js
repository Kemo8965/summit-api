const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors')

router.get('/', async (req,res)=>{
  
       res.send('Authentication Route is grafting');

});

//GET ALL USERS
router.get('/allUsers', async (req,res)=>{
    try {
        
        const usersAdmin = await User.find();
        res.json({

            status: 'Successfully retreived users!',
            data: usersAdmin
           
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });


 //GET  USER
router.get('/User/:id', async (req,res)=>{
  try {
      
      const user = await User.findById({_id: req.params.id});
      res.json({

          status: 'Successfully retreived user!',
          data: user
         
      })

    

      

  } catch (error) {
      res.json({ message: error})
  }
});


 
  //LOGIN  USERS
    router.post('/login', async (req,res)=>{


      
      const user = await User.findOne({ email: req.body.email });

      console.log(user);

      if(!user) return res.status(400).send('Email is not found');

      const validPass = await bcrypt.compare(req.body.password, user.password);
      if(!validPass) return res.status(400).send('Password is invalid');

      


      
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token',token).send({ message: `Logged in as ${req.body.role} !`,
          name:user.name, id: user._id, role: user.role, token: token});
 
       res.send('Logged In ');
        


      const {error}= loginValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

       
     
    });





    //LOGOUT USER
    router.get('/logout', async (req,res) => {
        res.header('auth-token', '', { maxAge: 1 });
        res.redirect('/auth/login').send('Logged Out!');
    });


    

      //-------------------------REGISTER USERS-----------------------------------------
      //REGISTER USER
    router.post('/register', async (req,res)=>{
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
           password: hashPassword,
           role: req.body.role
       });
    
       console.log(registeredUser);
       
      const savedUser = await registeredUser.save();
        
            res.json({
               
                status: 'Successfully Registered User!',
                data: savedUser
            });
        } catch (err) {
             res.json({ message: err })
        }
      }
    });
  
  


    

module.exports= router