const constants = require('../static/constants.js');
const helpers = require('./helper');

function changeLocation(location) {
    if (!window || !window.location || !window.location.href) {
        return;
    }
    window.location.href = location;
}

function validateInput(currentValuePassword, currentValueLogin) {
    if (!currentValueLogin || !currentValuePassword) {
        errorAuth();
    }
}

function errorAuth() {
    let languageArray = helpers.getCurrentLanguagesSet();
    document.querySelector('.input-section__error-password').innerHTML = languageArray.a_loginErrorMessage;
}

function valLoginReg(login) {
    let languageArray = helpers.getCurrentLanguagesSet();
    if ( login.length > 1 && login[0].match(/[a-zA-Z]/)) {
        document.querySelector('.registration_inputLogin__error').innerHTML = "";
        return true;
    } else {
        document.querySelector('.registration_inputLogin__error').innerHTML = languageArray.b_loginError;
        return false;
    }
}

function valPasswordReg(password) {
    let languageArray = helpers.getCurrentLanguagesSet();
    if (password.length > 4) {
        document.querySelector('.registration_inputPassword__error').innerHTML = "";
        return true;
    } else {
        document.querySelector('.registration_inputPassword__error').innerHTML = languageArray.b_passwordError;
        return false;
    }
}

function valPasswordAgainReg(password1, password2) {
    let languageArray = helpers.getCurrentLanguagesSet();
    if (password2 === password1) {
        document.querySelector('.registration_inputAgainPassword__error').innerHTML = "";
        return true;
    } else {
        document.querySelector('.registration_inputAgainPassword__error').innerHTML = languageArray.b_passwordMachError;
        return false;
    }
}

function valMailReg(email) {
    let languageArray = helpers.getCurrentLanguagesSet();
    if (email.length > 0 && email.match(/\S+@\S+\.\S+/)) {
        document.querySelector('.registration_inputMail__error').innerHTML = "";
        return true;
    } else {
        document.querySelector('.registration_inputMail__error').innerHTML = languageArray.b_emailError;
        return false;
    }
}

function valPhoneReg(phone) {
    let languageArray = helpers.getCurrentLanguagesSet();
    if(phone.length > 0){
        if (phone.length === 13 && phone.slice(0, 3) === "+38") {
            document.querySelector('.registration_inputPhone__error').innerHTML = "";
            return true;
        } else {
            document.querySelector('.registration_inputPhone__error').innerHTML = languageArray.b_phoneError;
            return false;
        }
    }
    else {
        document.querySelector('.registration_inputPhone__error').innerHTML = "";
        return true;
    }

}

function getErrorMessageByStatusCode(statusCode) {
    let languageArray = helpers.getCurrentLanguagesSet();
    switch (statusCode) {
        case 500:
            return languageArray.b_dbError;
        case 502:
            return languageArray.b_errorLoginExist;
    }
}

function validateCreateInput(firstName, lastName, homeTown, age) {
    let languageArray = helpers.getCurrentLanguagesSet();
    if (firstName.match(/[0-9]/) || lastName.match(/[0-9]/) || homeTown.match(/[0-9]/)) {
        alert(languageArray.s_createStudentFieldsError);
        return false;
    } else if (!firstName || !lastName || !age || !homeTown) {
        alert(languageArray.s_createStudentError);
        return false;
    } else {
        return true;
    }
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
    validateCreateInput: validateCreateInput
};
