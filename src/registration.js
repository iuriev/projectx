require("./styles/index.less");
const constants  = require('./static/constants.js');
let utils = require('./helpers/utils.js');
let stateOfFilds;
let login;
let password1;
let password2;
let email;
let phone;

window.addEventListener("load", function () {
    stateOfFilds = false;
    document.getElementById('registerBtn').addEventListener('click', teacherRegister);
    document.addEventListener('keyup', function() {
        login = document.getElementById('loginReg').value;
        password1 = document.getElementById('passwordReg1').value;
        password2 = document.getElementById('passwordReg2').value;
        email = document.getElementById('emailReg').value;
        phone = document.getElementById('telReg').value;
        valFormsReg();
    });
});

function valFormsReg() {
    var errorAll = document.querySelector('.registration_inputAll__error');
    if (login && password1 && password2 && email && phone) {
        errorAll.innerHTML = '';
        var logValRes = utils.valLoginReg(login);
        var pasValRes = utils.valPasswordReg(password1);
        var againValRes = utils.valPasswordAgainReg(password1, password2);
        var mailValRes = utils.valMailReg(email);
        var phoneValRes = utils.valPhoneReg(phone);
        stateOfFilds = logValRes && pasValRes && againValRes && mailValRes && phoneValRes;
    }else{
        errorAll.innerHTML = constants.instructionErrAllReg;
    }
}

function teacherRegister(){
    if(stateOfFilds){
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

