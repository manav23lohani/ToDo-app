const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5001;
const cors = require('cors');
let sql;
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./todo.db', sqlite.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err);
});

app.use(bodyParser.json());
app.use(cors());
// post request
app.post('/todo', (req, res) => {
    try {
        const { todo, status } = req.body;
        sql = 'INSERT INTO todo (todo, status) VALUES (?, ?)';
        db.run(sql, [todo, status], (err) => {
            if (err) {
                res.status(500).json({ error: 'Error adding TODO' });
            }
            res.status(200).json({message: 'Added successfully'});
        });
    } catch (error) {
        console.error('Error adding TODO:', error);
        res.status(500).json({ error: 'Error adding TODO' });
    }
});


//get request
app.get('/todo', (req, res) => {
    try {
        sql = 'SELECT * FROM todo';
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: 'Error fetching TODOs' });
            }
            res.status(200).json({ data: rows, message: 'Fetched successfully' });
        });
    } catch (error) {
        console.error('Error fetching TODOs:', error);
        res.status(500).json({ error: 'Error fetching TODOs' });
    }
});


//update request
app.put('/todo/:id', (req, res) => {
    try{
        const todoId = req.params.id;
        const { todo, status } = req.body;
        sql = 'UPDATE todo SET todo = ?, status = ? WHERE ID = ?';
        db.run(sql, [todo, status, todoId], (err) => {
            if (err) {
                res.status(500).json({ error: 'Error updating TODO' });
            } 
            res.status(200).json({ message: 'Updated successfully' });
        });
    }catch(err){
        console.error('Error updating TODO:', err);
        res.status(500).json({ error: 'Error updating TODO' });  
    }
});


// delete request
app.delete('/todo/:id', (req, res) => {
    try{
        const todoId = req.params.id;
        sql = 'DELETE FROM todo WHERE ID = ?';
        db.run(sql, [todoId], (err) => {
            if (err) {
                res.status(500).json({ error: 'Error deleting TODO' });
            } 
            res.status(200).json({ message: 'Deleted successfully' });
        });
    }catch(err){
        console.error('Error deleting TODO:', err);
        res.status(500).json({ error: 'Error deleting TODO' });  
    }
});

app.listen(PORT, () => {
    console.log(`listening for requests ${PORT}`);
});