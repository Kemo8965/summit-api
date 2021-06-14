
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('./models/Post');
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

app.get('/',(req,res) => {
    res.send('Server is Working!')
});


const port = process.env.PORT || 80 ;
if (port == null || port == "") {
    port= 5008;
}

app.listen(port, () =>
    console.log(`Server listening on port ${port}`));