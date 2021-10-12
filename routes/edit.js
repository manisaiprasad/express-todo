var express = require('express');
var router = express.Router();

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


router.route('/edit/:id')
  .put(function(req, res) {
    console.log(req.params.id);
    knex('todos')
      .where('id',req.params.id)
      .update({
        task: req.body.task,
      })
      .then(() => {
        res.redirect('/');
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