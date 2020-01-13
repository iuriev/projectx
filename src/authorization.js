require("./styles/index.less");
var constants = require("./static/constants");
var utils = require('./helpers/utils.js');
var inputLogin;
var inputPass;
var xhr;

window.addEventListener("load", function () {
    // document.getElementById('regText').hidden = localStorage.getItem("regSuccess") === null; // FIXME
    document.getElementById('login').addEventListener('click', processAuthorization);
    document.getElementById('register').addEventListener('click', function () {
        utils.changeLocation(constants.pathRegistrationPage);
    });
    inputLogin = document.getElementById('inputLogin');
    inputPass = document.getElementById('inputPass');
    xhr = new XMLHttpRequest();
});

function processAuthorization() {
    validateForm();
    var requestBody = {
        login: inputLogin.value,
        password: inputPass.value
    };
    xhr.open("POST", `${constants.server}authorizeTeacher`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 501 && xhr.responseText === "SERVER ERROR") {
                alert(utils.getErrorMessageByStatusCode(xhr.status));
            }
            else{
                var responseArray = JSON.parse(xhr.responseText);
                localStorage.setItem("UserID", responseArray[0].id);
                localStorage.setItem("UserLogin", responseArray[0].login);
                utils.changeLocation(constants.pathStudentsPage);
            }
        }
    };
    xhr.send(JSON.stringify(requestBody));
}

function validateForm() {
    utils.validateInputLogin(inputLogin.value); // FIXME
    utils.validateInputPass(inputPass.value);   // FIXME
}
