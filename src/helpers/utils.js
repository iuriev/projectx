let textErrorLogin = document.querySelector('.input-section__error-login'),
    textErrorPassword = document.querySelector('.input-section__error-password'),
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

function validateInputLogin(currentValue) {
    if(!currentValue){
        textErrorLogin.classList.toggle('error');
        textErrorLogin.innerHTML = 'Incorrect a login';
    }
}
function validateInputPass(currentValue) {
    if(!currentValue){
        textErrorPassword.classList.toggle('error');
        textErrorPassword.innerHTML = 'Incorrect a password';
    }
}

function valLoginReg(login) {
    if(login[0].match(/[a-zA-Z]/) && login.length > 5){
        errorLogin.classList.remove('error');
        errorLogin.classList.add('registration_input__error');
        return true;
    }else{
        errorLogin.classList.add('error');
        errorLogin.classList.remove('registration_input__error');
        return false;
    }
}

function valPasswordReg(password) {
    if(password.length > 5){
        errorPassword1.classList.remove('error');
        errorPassword1.classList.add('registration_input__error');
        return true;
    }else{
        errorPassword1.classList.add('error');
        errorPassword1.classList.remove('registration_input__error');
        return false;
    }
}

function valPasswordAgainReg(password1, password2) {
    if(password2 === password1){
        errorPassword2.classList.remove('error');
        errorPassword2.classList.add('registration_input__error');
        return true;
    }else{
        errorPassword2.classList.add('error');
        errorPassword2.classList.remove('registration_input__error');
        return false;
    }
}

function valMailReg(email) {
    if(email.includes("@")){
        errorEmail.classList.remove('error');
        errorEmail.classList.add('registration_input__error');
        return true;
    }else{
        errorEmail.classList.add('error');
        errorEmail.classList.remove('registration_input__error');
        return false;
    }
}

function valPhoneReg(phone) {
    if(phone.slice(0, 3) === "+38" && phone.length === 13){
        errorPhone.classList.remove('error');
        errorPhone.classList.add('registration_input__error');
        return true;
    }else{
        errorPhone.classList.add('error');
        errorPhone.classList.remove('registration_input__error');
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

module.exports = {
    changeLocation: changeLocation,
    validateInputLogin: validateInputLogin,
    validateInputPass: validateInputPass,
    getErrorMessageByStatusCode: getErrorMessageByStatusCode,
    valLoginReg: valLoginReg,
    valPasswordReg: valPasswordReg,
    valPasswordAgainReg: valPasswordAgainReg,
    valMailReg: valMailReg,
    valPhoneReg: valPhoneReg
};
