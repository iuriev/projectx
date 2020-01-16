var config = require('../static/config.js');
var helper = require('../helpers/helper.js');
var bodyParser = require("body-parser");
var {Client} = require('pg');
var express = require('express');
var server = express();
var client = new Client(config.connectionString);
client.connect();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen(3001, function () {
    console.log('Server started on port 3001 ..')
});

server.post('/authorize-teacher', function (req, res) {

    var sql = `SELECT id,login FROM teacher WHERE login = $1 AND password = $2;`;
    client.query(sql, [req.body.login, req.body.password], (error, response) => {
        if (error) {
            res.status(500).send("SERVER ERROR");
        } else {
            if (response.rows.length) {
                res.status(200).json(response.rows);
            } else {
                res.status(501).send("SERVER ERROR");
            }
        }
    });
});

server.post('/create-teacher', function (req, res) {
    var sql = `INSERT INTO teacher (login,password,email,phone) VALUES ($1, $2, $3, $4) ;`;
    client.query(sql, [req.body.login, req.body.password, req.body.email, req.body.phone], (err, response) => {
        if (err) {
            res.status(502).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.get('/all-students', function (req, res) {
    var sql = `SELECT id,fn,ln,age,ht FROM account WHERE teacher_id = $1 ORDER BY id ASC;`;
    client.query(sql, [req.query.id], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).json(response.rows);
        }
    });
});

server.get('/teacher', function (req, res) {
    var sql = `SELECT login,password,email,phone FROM teacher WHERE id = $1;`;
    client.query(sql, [req.query.id], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).json(response.rows);
        }
    });
});

server.post('/update-teacher', function (req, res) {
    console.log(req.body.id, req.body.login, req.body.password, req.body.email, req.body.phone);
    var sql = `UPDATE teacher SET (login,password,email,phone) = ($2, $3, $4, $5) WHERE id = $1;`;
    client.query(sql, [req.body.id, req.body.login, req.body.password, req.body.email, req.body.phone], (err, response) => {
        if (err) {
            res.status(502).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/create-student', function (req, res) {
    var sql = `INSERT INTO account (fn,ln,age,ht,teacher_id) VALUES ($1, $2,$3, $4, $5) ;`;
    client.query(sql, [req.body.fn, req.body.ln, req.body.age, req.body.ht, req.body.teacherId], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/update-student-info', function (req, res) {
    var sql = helper.queryBuilder(req.body);
    client.query(sql, (err) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/delete-student', function (req, res) {
    var sql = `DELETE FROM account WHERE id = $1 `;
    client.query(sql, [req.body.id], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});
