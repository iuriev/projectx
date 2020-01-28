var config = require('../static/config.js');
var helper = require('../helpers/helper.js');
var bodyParser = require('body-parser');
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

    var sql = `SELECT id,login,picture_url FROM teacher WHERE login = $1 AND password = $2 ORDER BY id ASC; `;
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
    var newGroupId = 0;
    var newTeacherId = 0;
    console.log(req.body)
    var sql1 = `INSERT INTO teacher (login,password,email,phone,keyword,picture_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`;
    client.query(sql1, [req.body.login, req.body.password, req.body.email, req.body.phone, req.body.keyword, req.body.avatar], (err, response) => {
        if (err) {
            res.status(502).send("SERVER ERROR");
        } else {
            newTeacherId = response.rows[0].id;
            var sql2 = `INSERT INTO course_group (name) VALUES ($1) RETURNING id ;`;
            client.query(sql2, ["untitled"], (err, response) => {
                if (err) {
                    res.status(502).send("SERVER ERROR");
                } else {
                    newGroupId = response.rows[0].id;
                    var sql = `INSERT INTO course_teacher (id_teacher , id_group) VALUES ($1, $2);`;
                    client.query(sql, [newTeacherId, newGroupId], (err, response) => {
                        if (err) {
                            res.status(502).send("SERVER ERROR");
                        } else {
                            res.status(200).send();
                        }
                    });
                }
            });
        }
    });
});

server.get('/teacher-groups', function (req, res) {

    var sql = `SELECT t1.id_group, t2.name FROM course_teacher t1 inner join course_group t2 on t1.id_group = t2.id WHERE id_teacher = $1 ORDER BY t1.id ASC ;`;
    client.query(sql, [req.query.id_teacher], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            console.log(response.rows);
            res.status(200).json(response.rows);
        }
    });
});

server.get('/password-forgot', function (req, res) {
    var sql = `SELECT keyword, password, login FROM teacher WHERE keyword = $1 ORDER BY keyword ASC`;
    client.query(sql, [req.query.keyword], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).json(response.rows);
        }
    });
});

server.get('/all-students', function (req, res) {
    var sql = `SELECT id,fn,ln,age,ht FROM account WHERE id_group = $1 ORDER BY id ASC;`;
    client.query(sql, [req.query.id_group], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).json(response.rows);
        }
    });
});

server.get('/teacher', function (req, res) {
    var sql = `SELECT login,password,email,phone,keyword,about FROM teacher WHERE id = $1 ORDER BY id ASC;`;
    client.query(sql, [req.query.id], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).json(response.rows);
        }
    });
});

server.post('/update-teacher', function (req, res) {
    var sql = `UPDATE teacher SET (login,password,email,phone,keyword,about) = ($2, $3, $4, $5, $6, $7) WHERE id = $1;`;
    client.query(sql, [req.body.id, req.body.login, req.body.password, req.body.email, req.body.phone, req.body.keyword, req.body.about], (err, response) => {
        if (err) {
            res.status(502).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/save-group-name', function (req, res) {
    var sql = `UPDATE course_group SET name = $2 WHERE id =$1;`;
    client.query(sql, [req.body.id, req.body.name ], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/create-student', function (req, res) {
    var sql = `INSERT INTO account (fn,ln,age,ht,id_group) VALUES ($1, $2,$3, $4, $5) ;`;
    client.query(sql, [req.body.fn, req.body.ln, req.body.age, req.body.ht, req.body.id_group], (err, response) => {
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

server.post('/delete-group', function (req, res) {
    var sql = `DELETE FROM course_teacher WHERE id_group = $1 `;
    client.query(sql, [req.body.id], (err, response) => {
        if (err) {
            res.status(501).send("SERVER ERROR");
        } else {
            var sql2 = `DELETE FROM account WHERE id_group = $1 `;
            client.query(sql2, [req.body.id], (err, response) => {
                if (err) {
                    res.status(502).send("SERVER ERROR");
                } else {
                    var sql3 = `DELETE FROM course_group WHERE id = $1 `;
                    client.query(sql3, [req.body.id], (err, response) => {
                        if (err) {
                            res.status(503).send("SERVER ERROR");
                        } else {
                            res.status(200).send();
                        }
                    });
                }
            });
        }
    });
});


server.post('/create-new-group', function (req, res) {

    console.log("ffd")
    var newGroupId = 0;
    var sql2 = `INSERT INTO course_group (name) VALUES ($1) RETURNING id ;`;
    client.query(sql2, ["untitled"], (err, response) => {
        if (err) {
            res.status(502).send("SERVER ERROR");
        } else {
            newGroupId = response.rows[0].id;
            var sql = `INSERT INTO course_teacher (id_teacher , id_group) VALUES ($1, $2);`;
            client.query(sql, [req.body.id, newGroupId], (err, response) => {
                if (err) {
                    res.status(502).send("SERVER ERROR");
                } else {
                    res.status(200).send();
                }
            });
        }
    });


});


