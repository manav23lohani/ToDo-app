const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5001;
let sql;
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./todo.db', sqlite.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err);
});

app.use(bodyParser.json());

// post request
app.post('/todo', (req, res) => {
    try {
        const { todo, status } = req.body;
        sql = 'INSERT INTO todo (todo, status) VALUES (?, ?)';
        db.run(sql, [todo, status], (err) => {
            if (err) {
                return res.json({ status: 300, success: false, error: err });
            }
            console.log("Successfully added", todo, status);
            return res.json({ status: 200, success: true });
        });
    } catch (error) {
        return res.json({ status: 400, success: false });
    }
});


//get request
app.get('/todo', (req, res) => {
    sql = 'SELECT * FROM todo';
    try{
        db.all(sql, [], (err, rows) => {
            if(err) return res.json({status: 300, success: false, error: err});
            return res.json({status:200, data: rows, success: true});
        });
    }catch(err){
        return res.json({status: 400, success: false});
    }
});

app.listen(PORT, () => {
    console.log(`listening for requests ${PORT}`);
});