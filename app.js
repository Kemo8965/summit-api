
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('./models/Post');
const User = require('./models/User');
const postsRoute = require('./routes/posts');

//middleware
app.use(express.json());
app.use('/posts', postsRoute);



// Default Route
app.get('/', (req,res) =>{
    res.send('Server is Working!')
});


//Mongo URI
const mongoURI = process.env.MONGODB_URI;

// const mongoURI = 'mongodb://localhost:27017/FileUploads_DB';

//Mongo Connection
const conn = mongoose.connect(mongoURI, {useNewUrlParser:true, useUnifiedTopology:true });

// conn.once('open', ()=> console.log('MongoDB is connected!'));
// conn.on('error', (e)=> console.log(e));
app.get('/users', async (req,res)=>{
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

app.post('/users',async (req,res)=>{
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


const port = process.env.PORT || 80 ;
if (port == null || port == "") {
    port= 5008;
}

app.listen(port, () =>
    console.log(`Server listening on port ${port}`));