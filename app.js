var config = require('./helpers/config.js');
var helper = require('./helpers/helper.js');
var bodyParser = require("body-parser");
var {Client} = require('pg');
var express = require('express');
var app = express();
var client = new Client(config.connectionString);
client.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3001, function () {
    console.log('Server started on port 3001 ..')
});

app.post('/login', function (req, res) {
    var sql = `SELECT id FROM teacher WHERE login = $1 AND password = $2;`;
    client.query(sql, [req.body.login, req.body.password], (err, response) => {
        if (err) {
            res.status(200).send("SERVER ERROR");
        } else {
            if (response.rows.length > 0) {
                res.status(200).json(response.rows);
            } else {
                res.status(200).send("LOGIN ERROR");

            }
        }
    });
});

app.post('/createTeacher', function (req, res) {
    var sql = `INSERT INTO teacher (login,password,email,phone) VALUES ($1, $2, $3, $4) ;`;
    client.query(sql, [req.body.login, req.body.password, req.body.email, req.body.phone], (err, response) => {
        if (err) {
            res.status(200).send("LOGIN ERROR");
        } else {
            res.status(200).send("");
        }
    });
});

app.post('/getStudents', function (req, res) {

    var sql = `SELECT id,fn,ln,age,ht FROM account WHERE teacher_id = $1;`;
    client.query(sql, [req.body.id], (err, response) => {
        if (err) {
            res.status(200).send("ID ERROR");
        } else {
            res.json(response.rows);
        }
    });
});

app.post('/create', function (req, res) {
    var sql = `INSERT INTO account (id,fn,ln,age,ht,teacher_id) VALUES ($1, $2,$3, $4, $5, $6) ;`;
    client.query(sql, [req.body.id, req.body.fn, req.body.ln, req.body.age, req.body.ht, req.body.teacherId], (err, response) => {
        if (err) {
            res.status(200).send("ID ERROR");
        } else {
            res.status(200).send();
        }
    });
});

app.post('/update', function (req, res) {

    var sqlChecker = `select exists(select 1 from account where id=$1)`;
    client.query(sqlChecker, [req.body.id], (err, response) => {
        if (response.rows[0].exists) {
            var sql = helper.queryBuilder(req.body);
            client.query(sql, (err) => {
                if (err) {
                    res.status(200).send("EMPTY"); //400
                } else {
                    res.status(200).send();
                }
            });
        } else {
            res.status(200).send("ID ERROR"); //500
        }
    });
});

app.post('/delete', function (req, res) {

    var sqlChecker = `select exists(select 1 from account where id=$1)`;
    client.query(sqlChecker, [req.body.id], (err, response) => {
        if (response.rows[0].exists) {
            var sql = `DELETE FROM account WHERE id = $1 `;
            client.query(sql, [req.body.id], (err, response) => {
                if (err) {
                } else {
                    res.status(200).send();
                }
            });
        } else {
            res.status(200).send("ID ERROR");
        }
    });
});