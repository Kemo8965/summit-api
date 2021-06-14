const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/', async (req,res)=>{
   try {
       const posts = await Post.find();
       res.json(posts);

   } catch (error) {
       res.json({ message: error})
   }
});

router.get('/allUsers', async (req,res)=>{
    try {
        const users = await User.find();
        res.json({
            message: users,
            status: 'Successfully retrieved data!'
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });

router.post('/newUsers',async (req,res)=>{
    console.log(req.body.title);
    
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
        console.log(req.body.email);
        
       const user= new User(req.body);
    
       console.log(user);
       
      const savedUsers = await user.save();
        try {
            res.json({
                message: savedUsers,
                status: 'Successfully sent data!'
            });
        } catch (error) {
             res.json({ message: err })
        }
    });


module.exports= router