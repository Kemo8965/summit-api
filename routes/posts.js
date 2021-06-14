const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req,res)=>{
   try {
       const posts = await Post.find();
       res.json(posts);

   } catch (error) {
       res.json({ message: error})
   }
});

router.post('/',async (req,res)=>{
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

module.exports= router