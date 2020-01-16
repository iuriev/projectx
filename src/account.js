var constants = require('./static/constants');
var utils = require('./helpers/utils.js');
var xhr;
var login;
var password;
var email;
var phone;
var id;

window.addEventListener('load', function () {
    id = localStorage.getItem("UserID");
    login = document.querySelector('#login');
    password = document.querySelector('#pass');
    email = document.querySelector('#email');
    phone = document.querySelector('#phone');
    xhr = new XMLHttpRequest();
    importInputs();
    document.querySelector('#returnbtn').addEventListener('click', function() {
        utils.changeLocation(constants.pathStudentsPage);
    });
    document.querySelector('#savebtn').addEventListener('click', function() {
        updateInfo();
    });
})

function importInputs() {
    xhr.open("GET", `${constants.server}teacher?id=${id}`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var temp = JSON.parse(xhr.responseText);
            login.value = temp[0]['login'];
            password.value = temp[0]['password'];
            email.value = temp[0]['email'];
            phone.value = temp[0]['phone'];
        }
    };
    xhr.send();
}

function updateInfo() {
    if (!login.value || !password.value || !email.value || !phone.value) {
        alert("If you want to change data fill in all inputs");
    } else {
        var requestBody = {
            id: id,
            login: login.value,
            password: password.value,
            email: email.value,
            phone: phone.value,  
        };
        xhr.open("POST", `${constants.server}update-teacher`);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                importInputs();  
            }
        };
        
        xhr.send(JSON.stringify(requestBody));
    }
}
