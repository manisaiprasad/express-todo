var express = require('express');
var router = express.Router();

function getAllTasks(knex) {
  return knex
    .select("*")
    .from("todos")
    .then(rows => rows);
}
function insertTasks(knex, newTask) {
  return knex
    .insert(newTask)
    .into("todos")
    .then(rows => {
      return rows[0];
    });
}

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '12345678',
    database : 'todo'
  },
  migrations: {
    tableName: 'migrations'
  }
});

/* GET home page. */
router.route('/')
  .get(function(req, res, next) {
    getAllTasks(knex).then(data => {
        console.log(data);
        res.render('index', { tasks: data});
      });
  })
  .post(function(req, res) {
      console.log(req.body.task)
      insertTasks(knex, req.body).then(data => {
        res.redirect('/');
    });
  });

router.route('/:id')
  .get(function(req, res) {
    console.log(req.params.id);
    knex('todos')
      .where('id',req.params.id)
      .del()
      .then(() => {
        res.redirect('/');
      })
  })
  .delete(function(req, res) {
    console.log(req.params.id);
    knex('todos')
      .where('id',req.params.id)
      .del()
      .then(() => {
        res.redirect('/');
      });
  });
    
router.route('/edit/:id')
  .post(function(req, res) {
    console.log(req.params.id);
    console.log(req.body.task);
    knex('todos')
      .where('id',req.params.id)
      .update({
        task: req.body.task,
      })
      .then(() => {
        res.redirect(303,'/');
      })
  })
  .get(function(req, res) {
    knex('todos')
      .where('id',req.params.id)
      .then((data) => {
        res.render('edit', {
          title: 'Edit',
          task: data[0]
        });
      })
  })
module.exports = router;