var express = require('express');
var todos = require('../resource/todo')
var router = express.Router();

const Todos = require('../models/Todos');


/* GET home page. */
router.get('/', async function(req, res, next) {
  // Todos.find(todos => {
  //   res.render('index', {title: 'To_Do List', subtitle: 'your To-Do List'})
  // })

  const todos = await Todos.find();
  console.log(todos);
  res.render('home', {todosList:todos});
});

router.get('/add-to-do', function(req, res, next) {
  res.render('addTodo', {title: 'Add To Do  '});
});

//Optional
// router.post('/save-to-do', async function(req, res, next) {
//   const todo = new Todos({
//     title: req.body.title,
//     description: req.body.description
//   });

//   await todo.save();

router.post('/save-to-do', async function(req, res, next) {
  await Todos.insertMany([{title: req.body.title, description: req.body.description }])
  // todos.push({...req.body, _id: '00${todos.length}'}); //concatination
  res.redirect('/');
});



router.get('/delete-to-do/:id', async function(req, res, next) {
  // console.log(req.params.id);
  // const toDelete = todos.findIndex(todo => todo._id === req.params.id)
  await Todos.deleteOne({_id: req.params.id}); 
  // todos.splice(toDelete, 1); 
  res.redirect('/');
});

router.get('/open-update-form/:id', async function(req, res, next){
  // const todotodo = todos.find(todo => todo._id === req.params.id)
  const todo = await Todos.findOne({_id: req.params.id});
  res.render('editToDo', {title: 'Edit To-Do', todo: todo});
});

router.post('/update-to-do/:id', async function(req, res, next){
  // const index = await Todos.findOne(todo => todo._id === req.params.id);
  await Todos.updateOne({_id: req.params.id}, {$set: {title: req.body.title, description: req.body.description}});

  // todos.splice(index,1, {...req.body, _id: req.params.id});
  res.redirect('/');
});


module.exports = router;
