const constants = require('../static/constants.js');

function queryBuilder(arr) {
    let sqlString = "";
    if (arr.fn !== "") {
        sqlString += `fn = '${arr.fn}'`;
    }
    if (arr.ln !== "") {
        if (sqlString === "") {
            sqlString += `ln = '${arr.ln}'`;
        } else {
            sqlString += `, ln = '${arr.ln}'`;
        }
    }
    if (arr.age !== "") {
        if (sqlString === "") {
            sqlString += `age = ${arr.age}`;
        } else {
            sqlString += `, age = ${arr.age}`;
        }
    }
    if (arr.ht !== "") {
        if (sqlString === "") {
            sqlString += `ht = '${arr.ht}'`;
        } else {
            sqlString += `, ht = '${arr.ht}'`;
        }
    }
    sqlString = "UPDATE account SET " + sqlString + " WHERE id = " + arr.id + ";";
    return sqlString;
}

function convertLanguageTextToNumber(languageText) {
    return languageText === "RU" ? 0 :  1;
}

function changeSelectedValue (){

    let lang = document.getElementById("language-authorization").options[document.getElementById("language-authorization").selectedIndex].value;
    localStorage.setItem('language', lang);
    let url = window.location.pathname;
    let filename = url.substring(url.lastIndexOf('/')+1);
    if(filename === constants.pathAuthorizationPage || filename === ""){
        setAuthorizationPageLanguage();
    }
    if(filename === constants.pathRegistrationPage){
        setRegistrationPageLanguage();
    }
    if(filename === constants.pathAccount){
        setAccountPageLanguage();
    }
    if(filename === constants.pathStudentsPage){
        setStudentsPageLanguage();
        document.location.reload();
    }
}

function getCurrentLanguagesSet() {
    let retrievedObject = localStorage.getItem('languages');
    let languageNumber = convertLanguageTextToNumber(localStorage.getItem('language'));
    return JSON.parse(retrievedObject)[languageNumber];
}

function setStudentsPageLanguage() {
    let languageArray = getCurrentLanguagesSet();
    document.querySelector('.language_name').innerHTML = languageArray.acc_caption;
    document.getElementById("labelFirstName").innerText = languageArray.s_fn;
    document.getElementById("labelLastName").innerText = languageArray.s_ln;
    document.getElementById("labelAge").innerText = languageArray.s_age;
    document.getElementById("labelCity").innerText = languageArray.s_ht;
    document.getElementById("btnCreate").innerText = languageArray.s_createButton;
    document.getElementById("boris").innerText = languageArray.a_boris;
    document.getElementById("andrey").innerText = languageArray.a_andrey;
    document.getElementById("dmitry").innerText = languageArray.a_dmitry;
    document.getElementById("ivan").innerText = languageArray.a_ivan;
    document.getElementById("copyright").innerText = languageArray.a_copyright;
    document.getElementById("deleteStudentFromActiveGroup").innerText = languageArray.s_delete_all;
}

function setAccountPageLanguage() {
    let languageArray = getCurrentLanguagesSet();
    document.getElementById("changeDataForm").innerHTML = languageArray.acc_changeDataForm;
    document.getElementById("loginLabel").innerText = languageArray.b_loginPlaceholder;
    document.getElementById("password1Label").innerText = languageArray.b_password1Placeholder;
    document.getElementById("password2Label").innerText = languageArray.b_password2Placeholder;
    document.getElementById("emailLabel").innerText = languageArray.b_emailPlaceholder;
    document.getElementById("phoneLabel").innerText = languageArray.b_phonePlaceholder;
    document.getElementById("savebtn").innerText = languageArray.acc_saveButtonText;
    document.getElementById("returnbtn").innerText = languageArray.acc_returnButtonText;
    document.getElementById("caption").innerText = languageArray.acc_caption;
    document.getElementById("boris").innerText = languageArray.a_boris;
    document.getElementById("andrey").innerText = languageArray.a_andrey;
    document.getElementById("dmitry").innerText = languageArray.a_dmitry;
    document.getElementById("ivan").innerText = languageArray.a_ivan;
    document.getElementById("copyright").innerText = languageArray.a_copyright;
    document.getElementById("textearea-label").innerText = languageArray.acc_texteareaLabel;
    document.getElementById("keywordLabel").innerText = languageArray.acc_keyword;
    document.getElementById("buttonSender").value = languageArray.acc_buttonImageSend;
}

function setRegistrationPageLanguage() {
    let languageArray = getCurrentLanguagesSet();
    document.getElementById("registrationFormTitle").innerText = languageArray.b_registrationFormTitle;
    document.getElementById("loginReg").placeholder = languageArray.b_loginPlaceholder;
    document.getElementById("passwordReg1").placeholder = languageArray.b_password1Placeholder;
    document.getElementById("passwordReg2").placeholder = languageArray.b_password2Placeholder;
    document.getElementById("emailReg").placeholder = languageArray.b_emailPlaceholder;
    document.getElementById("keyReg").placeholder = languageArray.b_keyPlaceholder;
    document.getElementById("telReg").placeholder = languageArray.b_phonePlaceholder;
    document.getElementById("registerBtn").innerText = languageArray.b_registrationButtonText;
    document.getElementById("backReg").innerText = languageArray.b_registrationBackText;
    document.getElementById("boris").innerText = languageArray.a_boris;
    document.getElementById("andrey").innerText = languageArray.a_andrey;
    document.getElementById("dmitry").innerText = languageArray.a_dmitry;
    document.getElementById("ivan").innerText = languageArray.a_ivan;
    document.getElementById("copyright").innerText = languageArray.a_copyright;
    if(document.querySelector('.registration_inputLogin__error').innerHTML !== ""){
        document.querySelector('.registration_inputLogin__error').innerHTML = languageArray.b_loginError;
    }
    if(document.querySelector('.registration_inputPassword__error').innerHTML !== ""){
        document.querySelector('.registration_inputPassword__error').innerHTML = languageArray.b_passwordError;
    }
    if(document.querySelector('.registration_inputAgainPassword__error').innerHTML !== ""){
        document.querySelector('.registration_inputAgainPassword__error').innerHTML = languageArray.b_passwordMachError;
    }
    if(document.querySelector('.registration_inputMail__error').innerHTML !== ""){
        document.querySelector('.registration_inputMail__error').innerHTML = languageArray.b_emailError;
    }
    if(document.querySelector('.registration_inputPhone__error').innerHTML !== ""){
        document.querySelector('.registration_inputPhone__error').innerHTML = languageArray.b_phoneError;
    }
    if(document.querySelector('.registration_inputAll__error').innerHTML !== ""){
        document.querySelector('.registration_inputAll__error').innerHTML = languageArray.b_allFieldsCheck;
    }
}

function setAuthorizationPageLanguage() {
    let languageArray = getCurrentLanguagesSet();
    document.getElementById("inputLogin").innerHTML = "";
    document.getElementById("inputPass").innerHTML = "";
    document.getElementById("labelLogin").innerHTML = languageArray.a_loginInputLabel;
    document.getElementById("labelPass").innerHTML = languageArray.a_passwordInputLabel;
    document.getElementById("login").innerText = languageArray.a_loginButtonText;
    document.getElementById("register").innerText = languageArray.a_registrationButton;
    document.getElementById("caption").innerText = languageArray.a_caption;
    document.getElementById("boris").innerText = languageArray.a_boris;
    document.getElementById("andrey").innerText = languageArray.a_andrey;
    document.getElementById("dmitry").innerText = languageArray.a_dmitry;
    document.getElementById("ivan").innerText = languageArray.a_ivan;
    document.getElementById("copyright").innerText = languageArray.a_copyright;
    document.getElementById("myBtn").innerText = languageArray.a_forgotPassword;
    document.getElementById("modalPassword").innerText = languageArray.a_modalPassword;
    document.getElementById("modalLogin").innerText = languageArray.a_modalLogin;
    document.getElementById("modalKeyword").innerText = languageArray.a_modalKeyword;
    document.getElementById("Seach_Key_Word").innerText = languageArray.a_seach_Key_Word;
    document.getElementById("givePasswordModal").innerText = languageArray.a_givePasswordModal;
    if(document.querySelector('.input-section__error-password').innerHTML !== ""){
        document.querySelector('.input-section__error-password').innerHTML = languageArray.a_loginErrorMessage;
    }
    if (localStorage.getItem("regSuccess") !== null) {
        document.getElementById("regText").innerText = languageArray.a_newRegistrationLabelText;
    }
}

module.exports = {
    queryBuilder: queryBuilder,
    changeSelectedValue: changeSelectedValue,
    setAuthorizationPageLanguage: setAuthorizationPageLanguage,
    getCurrentLanguagesSet: getCurrentLanguagesSet,
    setRegistrationPageLanguage: setRegistrationPageLanguage,
    setAccountPageLanguage: setAccountPageLanguage,
    setStudentsPageLanguage:setStudentsPageLanguage
};