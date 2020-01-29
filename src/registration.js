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
let keyword;
let count = 0;

window.addEventListener("load", function () {
    state = false;
    document.getElementById('registerBtn').addEventListener('click', teacherRegister);
    document.getElementById('language-authorization').addEventListener('change', helpers.changeSelectedValue);
    document.addEventListener('keyup', downButton);
    let e = document.getElementById("language-authorization");
    localStorage.getItem('language') === "RU" ? e.selectedIndex = 0 : e.selectedIndex = 1;
    helpers.setRegistrationPageLanguage();
    login = document.getElementById('loginReg');
    password1 = document.getElementById('passwordReg1');
    password2 = document.getElementById('passwordReg2');
    email = document.getElementById('emailReg');
    phone = document.getElementById('telReg');
    keyword = document.getElementById('keyReg');
});

function downButton() {
    if (count > 0) {
        let errorAll = document.querySelector('.registration_inputAll__error');
        let languageArray = helpers.getCurrentLanguagesSet();
        if (login && password1 && password2 && email) {
            errorAll.innerHTML = '';
            let logValRes = utils.valLoginReg(login.value);
            let pasValRes = utils.valPasswordReg(password1.value);
            let againValRes = utils.valPasswordAgainReg(password1.value, password2.value);
            let mailValRes = utils.valMailReg(email.value);
            if (phone.value && keyword.value) {
                let phoneValRes = utils.valPhoneReg(phone.value);
                let keyValRes = true;
                state = logValRes && pasValRes && againValRes && mailValRes && phoneValRes && keyValRes;
            } else if (keyword.value) {
                let keyValRes = true;
                state = logValRes && pasValRes && againValRes && mailValRes && keyValRes;
            } else if (phone.value) {
                let phoneValRes = utils.valPhoneReg(phone.value);
                state = logValRes && pasValRes && againValRes && mailValRes && phoneValRes;
            } else {
                state = logValRes && pasValRes && againValRes && mailValRes;
            }
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
            login: login.value,
            password: password1.value,
            email: email.value,
            phone: phone.value,
            keyword: keyword.value,
            avatar: constants.pathAvatar
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

