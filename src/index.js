const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

const courses = [
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"}
]

app.get('/',(req,res)=>{

})

app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id===parseInt(req.params.id))
    if(!course){
        res.status(404).send('not Found');
    }
    res.send(course);
})

app.post('/api/courses/',(req,res)=>{

    const {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    if(!req.body.name || req.body.name.length<3){
        res.status(400).send('name is required')
        return;
    }
    const course = {
        id:courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id',(req,res)=>{
    //buscar el curso
    const course = courses.find(c=> c.id===parseInt(req.params.id))
    if(!course) {
        res.status(404).send('NOT FOUND');
        return;
    }
    //validation
    const result = validateCourse(req.body)
    if(!result.error){
        res.status(400).send(error.details[0].message);
    }
    //update
    course.name=req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id===parseInt(req.params.id))
    if(!course) {
        res.status(404).send('NOT FOUND');
        return;
    }

    //delete 
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
})



function validateCourse(course){
    const schema ={
        name:Joi.string().min(25).required()
    }
    return Joi.validate(course,schema)
}

app.listen(3000);

