require("./styles/index.less");
let constants = require('./static/constants');
let utils = require('./helpers/utils.js');
let helpers = require('./helpers/helper');
let xhr;
let login;
let password;
let password2;
let email;
let phone;
let id;
let keyword;
let about;

window.addEventListener('load', function () {

    document.getElementById('language-authorization').addEventListener('change', helpers.changeSelectedValue);
    id = localStorage.getItem("UserID");
    login = document.querySelector('#login');
    password = document.querySelector('#pass');
    password2 = document.querySelector('#pass2');
    email = document.querySelector('#email');
    phone = document.querySelector('#phone');
    keyword = document.querySelector('#keyword');
    about = document.querySelector('#aboutMe');
    document.querySelector('#accountPhoto').src =localStorage.getItem('UserAvatar')
    
    let e = document.getElementById("language-authorization");
    if (localStorage.getItem('language') === "RU") {
        e.selectedIndex = 0;
    } else {
        e.selectedIndex = 1;
    }

    xhr = new XMLHttpRequest();
    importInputs();
    document.querySelector('#returnbtn').addEventListener('click', function () {
        utils.changeLocation(constants.pathStudentsPage);
    });
    document.querySelector('#savebtn').addEventListener('click', function () {
        if (!utils.valLoginReg(login.value) || !utils.valMailReg(email.value) || !utils.valPasswordReg(password.value) || !utils.valPasswordAgainReg(password.value, password2.value)) {
            document.addEventListener('keyup', function () {
                utils.valLoginReg(login.value);
                utils.valMailReg(email.value);
                utils.valPhoneReg(phone.value);
                utils.valPasswordReg(password.value);
                utils.valPasswordAgainReg(password.value, password2.value);
            });
        } else {
            let languageArray = helpers.getCurrentLanguagesSet();
            alert(languageArray.acc_successfullyUpdate);
            updateInfo();
        }
    });
    helpers.setAccountPageLanguage();
});

function importInputs() {
    xhr.open("GET", `${constants.server}teacher?id=${id}`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let temp = JSON.parse(xhr.responseText);
            login.value = temp[0]['login'];
            password.value = temp[0]['password'];
            password2.value = temp[0]['password'];
            email.value = temp[0]['email'];
            phone.value = temp[0]['phone'];
            keyword.value = temp[0]['keyword'];
            about.value = temp[0]['about'];
        }
    };
    xhr.send();
}

function updateInfo() {

    let requestBody = {
        id: id,
        login: login.value,
        password: password.value,
        email: email.value,
        phone: phone.value,
        keyword: keyword.value,
        about: about.value
    };
    xhr.open("POST", `${constants.server}update-teacher`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            importInputs();
            localStorage.setItem("UserLogin", login.value);
        }
    };

    xhr.send(JSON.stringify(requestBody));

}
