const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./todo.db', sqlite.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err);
});
const sql = 'CREATE TABLE todo(ID INTEGER PRIMARY KEY, todo, status)';
db.run(sql);