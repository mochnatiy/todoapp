var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var app = express();

var db = new sqlite3.Database('./todoapp.db');

//app.use(express.methodOverride());
//app.use(app.router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// GET /todos
app.get('/todos', function(req, res) {
  var todos = []

  db.each("SELECT * from todos", function(err, row) {
    todos.push({ "id": row.id, "content": row.content });
  });

  res.json({ todos: todos });
});

// POST /todos
app.post('/todos', function(req, res) {
  if(!req.body.todos || typeof req.body.todos != "string") {
    res.status(400).send('400 Bad Request');
  }

  var todos = req.body.todos;
  var content = todos[0].content

  var query = db.prepare("INSERT into todos(content) VALUES (?)");
  query.run(content);
  query.finalize();

  res.status(200).send('Todo has been created');
});

// GET /todos/id
app.get('/todos/:id', function(req, res) {
  var todos = []

  db.all("SELECT * from todos where id = " + req.id, function(err, rows) {
    todos.push({ "id": rows[0].id, "content": rows[0].content });
  });

  res.json({ todos: todos });
});

// PUT /todos/id
app.post('/todos/:id', function(req, res) {
  if(!req.body.todos || typeof req.body.todos != "string") {
    res.status(400).send('400 Bad Request');
  }

  var todos = req.body.todos;
  var content = todos[0].content;
  var id = todos[0].id;

  db.run("UPDATE todos SET content = " + content + "where id = " + id);

  res.status(200).send('Todo has been created');
});

// DELETE /todos/id

app.listen(3883);
