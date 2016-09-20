var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('todoapp.db');

db.serialize(function() {
  db.run("CREATE TABLE if not exists todos (content TEXT)");

  var query = db.prepare("INSERT INTO todos VALUES (?)");
  for (var i = 0; i < 5; i++) {
    query.run("test content " + i);
  }
  query.finalize();
});

db.close();
