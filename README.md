
* install postgreSQL install https://www.postgresql.org/ 
* your login and password must be admin
* install node.js https://nodejs.org/
* install Moesif Orign & CORS Changer extension for chrome. If you dont have chrome browser, please install it!
* install git https://git-scm.com/
--- 

* Open pgAdmin and:
* create BD 'students' database
* create table 'teacher' using scripts

CREATE TABLE teacher(
id serial PRIMARY KEY,
login character varying (20) NOT NULL UNIQUE,
password character varying (20) NOT NULL,
email character varying (25) NOT NULL,
phone character varying (15) NOT NULL
);

* create table 'account' using scripts

CREATE TABLE account(
id serial PRIMARY KEY,
fn character varying (20) NOT NULL,
ln character varying (20) NOT NULL,
age INTEGER  NOT NULL,
ht character varying (20) NOT NULL,
teacher_id INTEGER NOT NUll
);

ALTER TABLE account
ADD CONSTRAINT FK_teacher
FOREIGN KEY (teacher_id) REFERENCES teacher(id);

---

* clone repository git clone https://fesmofet@bitbucket.org/fesmofet/projectx.git
* enter to projectX folder
* run npm i
* run node server
* open index.html in Chrome
* Done!
---
You can also change path to your database and table in server.js.js connectionString variable


