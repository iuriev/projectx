
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
login character varying(20) NOT NULL UNIQUE,
password character varying (20) NOT NULL,
email character varying(30) NOT NULL,
phone character varying (20) NULL,
about character varying(500) NULL,
picture_url character varying(100) null,
keyword character varying(10) null
);

CREATE TABLE course_group(
id serial PRIMARY KEY,
name character varying(20) NOT NULL
);

CREATE TABLE course_teacher(
id serial PRIMARY KEY,
id_teacher integer NOT NULL,
id_group integer NOT NULL
);

ALTER TABLE course_teacher
ADD CONSTRAINT FK_teacher
FOREIGN KEY (id_teacher) REFERENCES teacher(id);

ALTER TABLE course_teacher
ADD CONSTRAINT FK_group
FOREIGN KEY (id_group) REFERENCES course_group(id);

CREATE TABLE account(
id serial PRIMARY KEY,
fn character (30) NOT NULL,
ln character (30) NOT NULL,
age INTEGER  NOT NULL,
ht character (30) NOT NULL,
id_group INTEGER NOT NUll
);

ALTER TABLE account
ADD CONSTRAINT FK_group
FOREIGN KEY (id_group) REFERENCES course_group(id);

---

* clone repository git clone https://fesmofet@bitbucket.org/fesmofet/projectx.git
* enter to projectX folder
* run npm i
* run node server
* open index.html in Chrome
* Done!
---
You can also change path to your database and table in server.js.js connectionString variable


