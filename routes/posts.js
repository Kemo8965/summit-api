const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/', async (req,res)=>{
  
       res.send('Posts is grafting');

});

router.get('/allUsers', async (req,res)=>{
    try {
        const users = await User.find();
        res.json(users);
 
    } catch (error) {
        res.json({ message: error})
    }
 });

router.post('/',async (req,res)=>{
    
    
   const post= new Post(req.body);

   console.log(post);
   
  const savedPosts = await post.save();
    try {
        res.json( savedPosts);
    } catch (error) {
         res.json({ message: err })
    }
});

    router.post('/users',async (req,res)=>{
      //  console.log(req.body.email);
        try {  
       const user= new User({
           email:req.body.email,
           password:req.body.password
       });
    
       console.log(user);
       
      const savedUsers = await user.save();
        
            res.json({
                message: savedUsers,
                status: 'Successfully sent data!'
            });
        } catch (error) {
             res.json({ message: err })
        }
    });


module.exports= router