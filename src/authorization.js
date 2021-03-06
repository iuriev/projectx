require("./styles/index.less");
const constants = require("./static/constants");
const utils = require('./helpers/utils.js');
const helpers = require('./helpers/helper');
let inputLogin;
let inputPass;
let xhr;

window.addEventListener("load", function () {
    initializedApp();
    document.getElementById('login').addEventListener('click', processAuthorization);
    document.getElementById('register').addEventListener('click', function () {
        utils.changeLocation(constants.pathRegistrationPage);
    });
    document.getElementById('language-authorization').addEventListener('change', helpers.changeSelectedValue);
    inputLogin = document.getElementById('inputLogin');
    inputPass = document.getElementById('inputPass');
    xhr = new XMLHttpRequest();
});

function initializedApp() {
    let languages =
        [
            {
                "a_loginInputLabel": "Введите ваш логин",
                "a_passwordInputLabel": "Введите ваш пароль",
                "a_loginButtonText": "Войти",
                "a_registrationButton": "Регистрация",
                "a_newRegistrationLabelText": "Вы успешно зарегистрировались.",
                "a_loginErrorMessage": "Введите корректные данные",
                "b_loginError": "Логин должен быть не меньше 5 символов и начинаться с числа",
                "b_passwordError": "Длина пароля минимум 5 символов",
                "b_passwordMachError": "Пароли не совпадают",
                "b_emailError": "Некорректный формат email",
                "b_phoneError": "Некорректный формат номера телефона",
                "b_registrationFormTitle": "Регистрация",
                "b_loginPlaceholder": "Логин",
                "b_password1Placeholder": "Пароль",
                "b_password2Placeholder": "Пароль еще раз",
                "b_emailPlaceholder": "Имейл",
                "b_phonePlaceholder": "Телефон",
                "b_registrationButtonText": "Зарегистрироваться",
                "b_allFieldsCheck": "Все поля должны быть заполнены",
                "b_dbError":"Ошибка соединения с БД",
                "b_errorLoginExist": "Пользователь с таким логином уже существует",
                "acc_changeDataForm" : "Изменение данных профиля",
                "acc_saveButtonText" : "Сохранить",
                "acc_returnButtonText" : "Назад",
                "acc_successfullyUpdate":"Ваши данные успешно обновлены",
                "s_fn": "Имя",
                "s_ln": "Фамилия",
                "s_age": "Возраст",
                "s_ht": "Город",
                "s_actions": "Действия",
                "button_delete": "Удалить",
                "button_update": "Изменить",
                "button_cansel": "Отменить",
                "s_createButton": "Создать",
                "s_teacher_login": "Здравствуйте, ",
                "s_createStudentError": "Для того чтобы добавить студента заполните пожалуйста все поля",
                "s_createStudentFieldsError": "Поля 'Имя', 'Фамилия' и 'Город' не могу содержать числа или символы"
            },
            {
                "a_loginInputLabel": "Enter login",
                "a_passwordInputLabel": "Enter password",
                "a_loginButtonText": "Login",
                "a_registrationButton": "Registration",
                "a_newRegistrationLabelText": "You are successfully registered",
                "a_loginErrorMessage": "Enter correct credential",
                "b_loginError": "Enter more than five char and begin with a letter",
                "b_passwordError": "Password must be longer than 5 characters",
                "b_passwordMachError": "Password should match",
                "b_emailError": "Enter correct Email: like mymail@mail.com",
                "b_phoneError": "Your number should start with \"+38\" and must be 13 characters long",
                "b_registrationFormTitle": "Registration",
                "b_loginPlaceholder": "Login",
                "b_password1Placeholder": "Password",
                "b_password2Placeholder": "Password again",
                "b_emailPlaceholder": "Email",
                "b_phonePlaceholder": "Phone number",
                "b_registrationButtonText": "Registration",
                "b_allFieldsCheck": "Fill in all the fields",
                "b_dbError":"DB Error",
                "b_errorLoginExist":"This login already in use",
                "acc_changeDataForm" : "Change profile data",
                "acc_saveButtonText" : "Save",
                "acc_returnButtonText" : "Back",
                "acc_successfullyUpdate":"Your data was successfully updated",
                "s_fn": "First name",
                "s_ln": "Last Name",
                "s_age": "Age",
                "s_ht": "City",
                "s_actions": "Actions",
                "button_delete": "Delete",
                "button_update": "Update",
                "button_cansel": "Cansel",
                "s_createButton": "Create ",
                "s_teacher_login": "Hello, ",
                "s_createStudentError": "If you want to add new student please fill all inputs",
                "s_createStudentFieldsError": "Fields \"First Name\", \"Last Name\", \"Hometown\" must not contain numbers or symbols"
            }
        ];
    localStorage.setItem('languages', JSON.stringify(languages));
    let e = document.getElementById("language-authorization");

    if (localStorage.getItem('language') === null) {
        localStorage.setItem('language', "RU");
    }
    localStorage.getItem('language') === "RU" ? e.selectedIndex = 0 : e.selectedIndex = 1;
    if (localStorage.getItem("regSuccess") === null) {
        document.getElementById('regText').style.display = "none";
    } else {
        document.getElementById('regText').style.display = "block";
    }
    helpers.setAuthorizationPageLanguage();
}

function processAuthorization() {
    validateForm();
    let requestBody = {
        login: inputLogin.value,
        password: inputPass.value
    };

    xhr.open("POST", `${constants.server}authorize-teacher`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 501 && xhr.responseText === "SERVER ERROR") {
                utils.errorAuth();
            }
            if (xhr.status === 200) {
                let responseArray = JSON.parse(xhr.responseText);
                localStorage.setItem("UserID", responseArray[0].id);
                localStorage.setItem("UserLogin", responseArray[0].login);
                utils.changeLocation(constants.pathStudentsPage);
            }
        }
    };
    xhr.send(JSON.stringify(requestBody));
}

function validateForm() {
    utils.validateInput(inputPass.value, inputLogin.value);
}
