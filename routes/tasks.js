const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

const verify = require('./verifyToken')

router.get('/', async (req,res)=>{
  
    res.send('Tasks Route is grafting!');

});

//GET ALL USERS
router.get('/allTasks', async (req,res)=>{
    try {
        const allTasks = await Task.find();
        res.json({

            status: 'Successfully retreived tasks!',
            data: allTasks
            
        });
 
    } catch (error) {
        res.json({ message: error})
    }
 });


 //CREATE NEW CLIENT
router.post('/addNewTask', async (req,res) => {
    
     try {  
        const newTask = new Task({

            taskDescription:req.body.taskDescription,
            selectPriority:req.body.selectPriority,
            assignTask:req.body.assignTask,
            issuedDate:req.body.date
           
            
        });
     
        console.log(newTask);
        
       const savedTask = await newTask.save();
         console.log(savedTask);
             res.json({
                
                 Message: 'Successfully added a new task!',
                 data: savedTask
             });
         } catch (err) {
              res.json({ message: err })
         }
});

module.exports= router