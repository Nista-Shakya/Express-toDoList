var express = require('express');
var todos = require('../resource/todo')
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {todosList:todos});
});

router.get('/add-to-do', function(req, res, next) {
  res.render('addTodo', {title: 'Add To Do  '});
});

router.post('/save-to-do', function(req, res, next) {
  todos.push({...req.body, _id: '00${todos.length}'}); //concatination
  res.redirect('/');
});

router.get('/delete-to-do/:id', function(req, res, next) {
  // console.log(req.params.id);
  const toDelete = todos.findIndex(todo => todo._id === req.params.id)
  todos.splice(toDelete, 1); 
  res.redirect('/');
});

router.get('/open-update-form/:id', function(req, res, next){
  const todotodo = todos.find(todo => todo._id === req.params.id)
  res.render('editToDo', {todo: todotodo});
});

router.post('/update-to-do/:id', function(req, res, next){
  const index = todos.findIndex(todo => todo._id === req.params.id);
  todos.splice(index,1, {...req.body, _id: req.params.id});
  res.redirect('/');
});

module.exports = router;
