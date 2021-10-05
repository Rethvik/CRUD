const express = require('express');
const mongoose = require('mongoose');
const {render} = require('ejs');
const tasks = require('./models/tasksStatus.js')
const app = express();
const mongoURL = 'mongodb+srv://rethvik:rethvik45@nodejs.xupzf.mongodb.net/Tasks?retryWrites=true&w=majority'
mongoose.connect(mongoURL)
    .then(() => app.listen(3000))
    .catch((err)=> console.error(err));
// set engine
app.set('view engine','ejs');

// Creating Tasks
app.get('/', (req, res) =>{
    const task1 = new tasks({
        description:"Running",
        completed:true
    });
    task1.save();
    const task2 = new tasks({
        description:"Eating",
        completed:false
    })
    task2.save();
    const task3 = new tasks({
        description:"Fishing",
        completed:false
    })
    task3.save();
    const task4 = new tasks({
        description:"Reading",
        completed:false
    })
    task4.save();
    res.send('To show the tasks please enter in the URL following format: localhost:3000/read');
})

// Reading Tasks
app.get('/read',(req, res) => {
    tasks.find()
        .then((results) =>{
            res.render('tasks',{tasks: results,paragraph:"To update tasks please enter in the url-- localhost:3000/update"});
            results.forEach( result=>{
                if(result.completed===false){
                    console.log(result.description);
                }
            });
        })
        .catch((err)=>{
            console.log(err);
        })
});
// Updating
app.get('/update',(req, res)=>{
    tasks.updateMany({completed:false},{completed:true})
        .then(()=>{
            res.redirect('/read')
        })
        .catch((err)=>{console.log(err)})
    
});

//Deleting tasks
app.get('/read/:id',(req, res)=>{
    const id = req.params.id;
    tasks.findByIdAndDelete(id) 
        .then(()=>{
            res.redirect('/read');
        })
        .catch((err)=>{console.log(err);})
})