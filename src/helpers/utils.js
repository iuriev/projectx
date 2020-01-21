const constants  = require('../static/constants.js');
let textErrorPassword = document.querySelector('.input-section__error-password'),
    errorLogin = document.querySelector('.registration_inputLogin__error'),
    errorPassword1 = document.querySelector('.registration_inputPassword__error'),
    errorPassword2 = document.querySelector('.registration_inputAgainPassword__error'),
    errorEmail = document.querySelector('.registration_inputMail__error'),
    errorPhone = document.querySelector('.registration_inputPhone__error');

function changeLocation(location) {
    if (!window || !window.location || !window.location.href) {
        return;
    }
    window.location.href = location;
}

function validateInput(currentValuePassword, currentValueLogin) {
    if(!currentValueLogin || !currentValuePassword){
        errorAuth();
    }
}
function errorAuth() {
    textErrorPassword.innerHTML = constants.instructionErrAuth;
}

function valLoginReg(login) {
    if(login[0].match(/[a-zA-Z]/) && login.length > 1){
        errorLogin.innerHTML = constants.instructionEmpty;
        return true;
    }else{
        errorLogin.innerHTML = constants.instructionErrLogReg;
        return false;
    }
}

function valPasswordReg(password) {
    if(password.length > 4){
        errorPassword1.innerHTML = constants.instructionEmpty;
        return true;
    }else{
        errorPassword1.innerHTML = constants.instructionErrPassReg;
        return false;
    }
}

function valPasswordAgainReg(password1, password2) {
    if(password2 === password1){
        errorPassword2.innerHTML = constants.instructionEmpty;
        return true;
    }else{
        errorPassword2.innerHTML = constants.instructionErrPassAgainReg;
        return false;
    }
}

function valMailReg(email) {
    if(email.includes("@")){
        errorEmail.innerHTML = constants.instructionEmpty;
        return true;
    }else{
        errorEmail.innerHTML = constants.instructionErrMailReg;
        return false;
    }
}

function valPhoneReg(phone) {
    if(phone.slice(0, 3) === "+38" && phone.length === 13){
        errorPhone.innerHTML = constants.instructionEmpty;
        return true;
    }else{
        errorPhone.innerHTML = constants.instructionErrPhoneReg;
        return false;
    }
}

function getErrorMessageByStatusCode(statusCode) {
    switch (statusCode) {
        case 500: return "DB error";
        case 501: return "Incorrect login or password";
        case 502: return "Login is already used";
        default:  return "Unknown exception was occurred while ...";
    }
}
function validateCreateInput(firstName, lastName, homeTown, age) {
    if(firstName.match(/[0-9]/) || lastName.match(/[0-9]/) || homeTown.match(/[0-9]/)) {
        alert(constants.instructionCreateNumbersAlert);
        return false;
    } else if(!firstName || !lastName || !age || !homeTown){
        alert(constants.instructionCreateEmptyAlert);
        return false;
    }
    else { return true;}
}
module.exports = {
    changeLocation: changeLocation,
    validateInput: validateInput,
    getErrorMessageByStatusCode: getErrorMessageByStatusCode,
    valLoginReg: valLoginReg,
    valPasswordReg: valPasswordReg,
    valPasswordAgainReg: valPasswordAgainReg,
    valMailReg: valMailReg,
    valPhoneReg: valPhoneReg,
    errorAuth: errorAuth,
    validateCreateInput: validateCreateInput,
};
