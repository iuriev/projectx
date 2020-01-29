const config = require('../static/config.js');
const helper = require('../helpers/helper.js');
const bodyParser = require('body-parser');
const {Client} = require('pg');
const express = require('express');
const server = express();
const client = new Client(config.connectionString);
const fileUpload = require('express-fileupload');
client.connect();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(fileUpload());
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen(3001, function () {
    console.log('Server started on port 3001 ..')
});

server.post('/delete-all-students-from-group', function (req, res) {
    let sql = `DELETE FROM account WHERE id_group = $1 `;
    client.query(sql, [req.body.groupId], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/password-forgot', function (req, res) {
    let sql = `SELECT password FROM teacher WHERE  login = $1 AND keyword = $2`;
    client.query(sql, [req.body.login, req.body.keyword], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).json(response.rows);
        }
    });
});

server.post('/get-new-avatar', function (req, res) {
    let sql = `SELECT picture_url FROM teacher WHERE id = $1; `;
    client.query(sql, [req.body.id], (error, response) => {
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

server.post('/authorize-teacher', function (req, res) {
    let sql = `SELECT id,login,picture_url FROM teacher WHERE login = $1 AND password = $2 ORDER BY id ASC; `;
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
    let newGroupId = 0;
    let newTeacherId = 0;
    let sql1 = `INSERT INTO teacher (login,password,email,phone,keyword,picture_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`;
    client.query(sql1, [req.body.login, req.body.password, req.body.email, req.body.phone, req.body.keyword, req.body.avatar], (err, response) => {
        if (err) {
            res.status(502).send("SERVER ERROR");
        } else {
            newTeacherId = response.rows[0].id;
            let sql2 = `INSERT INTO course_group (name) VALUES ($1) RETURNING id ;`;
            client.query(sql2, ["untitled"], (err, response) => {
                if (err) {
                    res.status(502).send("SERVER ERROR");
                } else {
                    newGroupId = response.rows[0].id;
                    let sql = `INSERT INTO course_teacher (id_teacher , id_group) VALUES ($1, $2);`;
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
    let sql = `SELECT t1.id_group, t2.name FROM course_teacher t1 inner join course_group t2 on t1.id_group = t2.id WHERE id_teacher = $1 ORDER BY t1.id ASC ;`;
    client.query(sql, [req.query.id_teacher], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).json(response.rows);
        }
    });
});

server.get('/all-students', function (req, res) {
    let sql = `SELECT id,fn,ln,age,ht FROM account WHERE id_group = $1 ORDER BY id ASC;`;
    client.query(sql, [req.query.id_group], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).json(response.rows);
        }
    });
});

server.get('/teacher', function (req, res) {
    let sql = `SELECT login,password,email,phone,keyword,about FROM teacher WHERE id = $1 ORDER BY id ASC;`;
    client.query(sql, [req.query.id], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).json(response.rows);
        }
    });
});

server.post('/update-teacher', function (req, res) {
    let sql = `UPDATE teacher SET (login,password,email,phone,keyword,about) = ($2, $3, $4, $5, $6, $7) WHERE id = $1;`;
    client.query(sql, [req.body.id, req.body.login, req.body.password, req.body.email, req.body.phone, req.body.keyword, req.body.about], (err, response) => {
        if (err) {
            res.status(502).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/save-group-name', function (req, res) {
    let sql = `UPDATE course_group SET name = $2 WHERE id =$1;`;
    client.query(sql, [req.body.id, req.body.name], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/create-student', function (req, res) {
    let sql = `INSERT INTO account (fn,ln,age,ht,id_group) VALUES ($1, $2,$3, $4, $5) ;`;
    client.query(sql, [req.body.fn, req.body.ln, req.body.age, req.body.ht, req.body.id_group], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/update-student-info', function (req, res) {
    let sql = helper.queryBuilder(req.body);
    client.query(sql, (err) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/delete-student', function (req, res) {
    let sql = `DELETE FROM account WHERE id = $1 `;
    client.query(sql, [req.body.id], (err, response) => {
        if (err) {
            res.status(500).send("SERVER ERROR");
        } else {
            res.status(200).send();
        }
    });
});

server.post('/delete-group', function (req, res) {
    let sql = `DELETE FROM course_teacher WHERE id_group = $1 `;
    client.query(sql, [req.body.id], (err, response) => {
        if (err) {
            res.status(501).send("SERVER ERROR");
        } else {
            let sql2 = `DELETE FROM account WHERE id_group = $1 `;
            client.query(sql2, [req.body.id], (err, response) => {
                if (err) {
                    res.status(502).send("SERVER ERROR");
                } else {
                    let sql3 = `DELETE FROM course_group WHERE id = $1 `;
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
    let newGroupId = 0;
    let sql2 = `INSERT INTO course_group (name) VALUES ($1) RETURNING id ;`;
    client.query(sql2, ["untitled"], (err, response) => {
        if (err) {
            res.status(502).send("SERVER ERROR");
        } else {
            newGroupId = response.rows[0].id;
            let sql = `INSERT INTO course_teacher (id_teacher , id_group) VALUES ($1, $2);`;
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

server.post('/upload', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.sampleFile;
    let pat = __dirname + "\\uploads\\";
    let time = new Date();
    let t = time.getTime();
    sampleFile.mv(pat + `${t + sampleFile.name}`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        let sql = `UPDATE teacher SET picture_url = $2 WHERE id = $1;`;
        client.query(sql, [req.body.userId, t + sampleFile.name], (err, response) => {
            if (err) {
                res.status(502).send("SERVER ERROR");
            } else {
                res.status(200).send();
            }
        });
        res.redirect(307, 'localhost:3030/account.html');
    });
});


