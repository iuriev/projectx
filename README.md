
* install postgreSQL install https://www.postgresql.org/ 
* your login and password must be admin
* install node.js https://nodejs.org/
* install Moesif Orign & CORS Changer extension for chrome. If you dont have chrome browser, please install it!
* install git https://git-scm.com/
--- 

* Enter pgAdmin
* create BD 'students' database
* create table 'account' using cript

CREATE TABLE account(
    id INTEGER PRIMARY KEY,
    fn VARCHAR (20) NOT NULL,
    ln VARCHAR (20) NOT NULL,
    age INTEGER  NOT NULL,
    ht VARCHAR (10) NOT NULL
    );

* clone repository git clone https://fesmofet@bitbucket.org/fesmofet/projectx.git
* enter to projectX folder
* run npm i
* run node app
* open index.html in Chrome
* Done!

---
You can also change path to your database and table in app.js connectionString variable


