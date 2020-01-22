require("./styles/index.less");
const constants = require('./static/constants.js');
let utils = require('./helpers/utils.js');
let helpers = require('./helpers/helper');
let state;
let login;
let password1;
let password2;
let email;
let phone;
let count = 0;

window.addEventListener("load", function () {
    state = false;
    document.getElementById('registerBtn').addEventListener('click', teacherRegister);
    document.getElementById('language-authorization').addEventListener('change', helpers.changeSelectedValue);
    document.addEventListener('keyup', downButton);
    let e = document.getElementById("language-authorization");
    localStorage.getItem('language') === "RU" ? e.selectedIndex = 0 : e.selectedIndex = 1;
    helpers.setRegistrationPageLanguage();
});

function downButton() {
    if (count > 0) {
        login = document.getElementById('loginReg').value;
        password1 = document.getElementById('passwordReg1').value;
        password2 = document.getElementById('passwordReg2').value;
        email = document.getElementById('emailReg').value;
        phone = document.getElementById('telReg').value;
        let errorAll = document.querySelector('.registration_inputAll__error');
        let languageArray = helpers.getCurrentLanguagesSet();
        if (login && password1 && password2 && email && phone) {
            errorAll.innerHTML = '';
            let logValRes = utils.valLoginReg(document.getElementById('loginReg').value);
            let pasValRes = utils.valPasswordReg(password1);
            let againValRes = utils.valPasswordAgainReg(password1, password2);
            let mailValRes = utils.valMailReg(email);
            let phoneValRes = utils.valPhoneReg(phone);
            state = logValRes && pasValRes && againValRes && mailValRes && phoneValRes;
        } else {
            errorAll.innerHTML = languageArray.b_allFieldsCheck;
        }
    }
}

function teacherRegister() {
    count++;
    downButton();
    if (state) {
        let xhr = new XMLHttpRequest();
        let requestBody = {
            login: login,
            password: password1,
            email: email,
            phone: phone
        };
        xhr.open("POST", `${constants.server}create-teacher`);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 && xhr.responseText === "") {
                    localStorage.setItem("regSuccess", 1);
                    utils.changeLocation('authorization.html')
                }
                if (xhr.status === 502) {
                    alert(utils.getErrorMessageByStatusCode(xhr.status));
                }
            }
        };
        xhr.send(JSON.stringify(requestBody));
    }
}

