
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Post = require('./models/Post');
const User = require('./models/User');
const Client = require('./models/Client');
const authRoute = require('./routes/auth');
//const clientRoute = require('./routes/clients');

//middleware
app.use(express.json());
app.use('/auth', authRoute);
// app.use('/clients', clientRoute);



// Default Route
app.get('/', (req,res) =>{
    res.send('Server is Working!')
});


//Mongo URI
// const mongoURI = `${process.env.MONGODB_URI}`;

// const mongoURI = 'mongodb://localhost:27017/FileUploads_DB';

//Mongo Connection

const conn = mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true });

// conn.once('open', ()=> console.log('MongoDB is connected!'));
// conn.on('error', (e)=> console.log(e));



const port = process.env.PORT || 80 ;
if (port == null || port == "") {
    port= 5008;
}

app.listen(port, () =>
    console.log(`Server listening on port ${port}`));