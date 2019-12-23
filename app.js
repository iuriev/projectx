
const bodyParser = require("body-parser");
const {Client} = require('pg');



const connectionString = 'postgres://postgres:admin@localhost:5432/guru99';
const client = new Client({connectionString: connectionString});
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
client.connect();

app.listen(3001, function () {
    console.log('Server started on port 3001 ..')
});

// for pug
const fs = require('fs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/all', function (req, result) {

    result.writeHead(200, {'Conten-Type': 'text/html'})
    fs.readFile('index.html', function (error, data) {
        if (error) {
            result.writeHead(404)
            result.WriteHead('error')
        } else {
            result.write(data);
        }
        result.end()
    });
});

app.get('/', function (req, res) {

    var sql = `SELECT * FROM account ORDER BY user_id ASC;`;
    client.query(sql, (err, queryRes) => {
        if (err) {
            throw err;
        }
        res.json(queryRes.rows);
    });
});

app.post('/create', function (req, res) {
    var sql = `INSERT INTO account (fn,ln,age, ht) VALUES ($1, $2,$3, $4);`;

    client.query(sql, [req.body.fn, req.body.ln, req.body.age, req.body.age], (err, res) => {
        if (err) {
            throw err;
        }
    });
    res.json({1:'fsdfsd'});
    console.log('Student ' + req.body.fn + ' ' + req.body.ln + ' was created.');
    res.send('Student ' + req.body.fn + ' ' + req.body.ln + ' was created.');
});

app.post('/update', function (req, res) {

    var sql = `UPDATE account SET fn = $2, ln = $3, age = $4, ht = $5 WHERE user_id = $1;`;
    client.query(sql, [req.body.id, req.body.fn, req.body.ln, req.body.age, req.body.ht], function (err, res) {
        if (err) {
            throw err;
        }
    });
    console.log("Information about student with id = " + req.body.id + " was update.");
    res.json({
        "id": req.body.id,
        "fn": req.body.id,
        "ln": req.body.ln,
        "age": req.body.age,
        "ht": req.body.ht
    })
});

app.post('/delete', function (req, res) {
    var sql = `DELETE FROM account WHERE user_id = $1 `;
    client.query(sql, [req.body.id], (err, res) => {
        if (err) {
            throw err;
        }
    });
    console.log("Student with id = " + req.body.id + " was deleted.");
    res.send("Student with id = " + req.body.id + " was deleted.");
});

