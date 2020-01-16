var constants = require('./static/constants');
var utils = require('./helpers/utils.js');
var xhr = new XMLHttpRequest();
var login = document.querySelector('#login')
var password = document.querySelector('#pass')
var email = document.querySelector('#email')
var phone = document.querySelector('#phone')

window.addEventListener('load', function () {
    importInputs();
    document.querySelector('#returnbtn').addEventListener('click', function() {
        utils.changeLocation(constants.pathStudentsPage);
    })
    document.querySelector('#savebtn').addEventListener('click', function() {
        updateInfo();
    })
})



function importInputs() {
    var id = localStorage.getItem("UserID");
    xhr.open("GET", `http://localhost:3001/teacher?id=${id}`, true);
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
        var id = localStorage.getItem("UserID");
        var requestBody = {
            id: id,
            login: login.value,
            password: password.value,
            email: email.value,
            phone: phone.value,  
        };
        xhr.open("POST", `http://localhost:3001/update-teacher`);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                importInputs();  
            }
        };
        
        xhr.send(JSON.stringify(requestBody));
    }
}
