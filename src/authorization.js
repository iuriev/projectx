require("./styles/index.less");
const constants = require("./static/constants");
const utils = require('./helpers/utils.js');
const helpers = require('./helpers/helper');
let inputLogin;
let inputPass;
let xhr;

window.addEventListener("load", function () {
    initializedApp();
    xhr = new XMLHttpRequest();
    inputLogin = document.getElementById('inputLogin');
    inputPass = document.getElementById('inputPass');
    document.getElementById('login').addEventListener('click', processAuthorization);
    document.getElementById('language-authorization').addEventListener('change', helpers.changeSelectedValue);
    document.getElementById('Seach_Key_Word').addEventListener('click', rememberPassword);
    document.getElementById('register').addEventListener('click', function () {
        utils.changeLocation(constants.pathRegistrationPage);
    });

});

function initializedApp() {
    let languages =
        [
            {
                "a_loginInputLabel": "Введите ваш логин",
                "a_no_password": "Пароль не найден",
                "a_no_login_or_pass": "Для восстановления пароля введите ваш логин и ключевое слово",
                "a_passwordInputLabel": "Введите ваш пароль",
                "a_loginButtonText": "Войти",
                "a_registrationButton": "Регистрация",
                "a_newRegistrationLabelText": "Вы успешно зарегистрировались.",
                "a_loginErrorMessage": "Неверный логин или пароль",
                "a_caption": "Вы находитесь на странице авторизации, ваш язык: ",
                "a_boris": "Андржиевский Борис",
                "a_andrey": "Беличенко Андрей",
                "a_dmitry": "Медведев Дмитрий",
                "a_ivan": "Юрьев Иван",
                "a_copyright": "Все права защищены",
                "a_forgotPassword": "Забыли пароль?",
                "a_modalPassword": "Восстановление пароля",
                "a_modalLogin": "Логин: ",
                "a_modalKeyword": "Ключевое слово: ",
                "a_seach_Key_Word": "Восстановить пароль",
                "a_givePasswordModal": "Ваш пароль: ",
                "b_loginError": "Логин должен быть не меньше 5 символов и начинаться с числа",
                "b_passwordError": "Длина пароля минимум 5 символов",
                "b_passwordMachError": "Пароли не совпадают",
                "b_emailError": "Некорректный формат email",
                "b_keyError": "Длина ключевого слова должна быть меньше 5 и больше 15",
                "b_phoneError": "Некорректный формат номера телефона",
                "b_registrationFormTitle": "Регистрация",
                "b_loginPlaceholder": "Логин",
                "b_password1Placeholder": "Пароль",
                "b_password2Placeholder": "Пароль еще раз",
                "b_emailPlaceholder": "Имейл",
                "b_keyPlaceholder": "Ключевое слово",
                "b_phonePlaceholder": "Телефон",
                "b_registrationButtonText": "Зарегистрироваться",
                "b_registrationBackText": "Вернуться к авторизации",
                "b_allFieldsCheck": "Все поля должны быть заполнены",
                "b_dbError":"Ошибка соединения с БД",
                "b_errorLoginExist": "Пользователь с таким логином уже существует",
                "acc_buttonImageSend": "Загрузить",
                "acc_changeDataForm" : "Изменение данных профиля",
                "acc_saveButtonText" : "Сохранить",
                "acc_returnButtonText" : "Назад",
                "acc_successfullyUpdate":"Ваши данные успешно обновлены",
                "acc_caption": "Вы зашли в свой кабинет, ваш язык:",
                "acc_texteareaLabel": "Напишите о себе:",
                "acc_keyword":"Ключевое слово",
                "s_fn": "Имя",
                "s_ln": "Фамилия",
                "s_age": "Возраст",
                "s_ht": "Город",
                "s_actions": "Действия",
                "s_language_text_label": "Язык",
                "button_delete": "Удалить",
                "button_update": "Изменить",
                "button_cansel": "Отменить",
                "s_createButton": "Создать",
                "s_teacher_login": "Здравствуйте, ",
                "s_createStudentError": "Для того чтобы добавить студента заполните пожалуйста все поля",
                "s_createStudentFieldsError": "Поля 'Имя', 'Фамилия' и 'Город' не могу содержать числа или символы",
                "s_delete_all": "Очистить выбранную таблицу"
            },
            {
                "a_loginInputLabel": "Enter login",
                "a_no_password": "Password not found",
                "a_no_login_or_pass": "Please write you login and keyword",
                "a_passwordInputLabel": "Enter password",
                "a_loginButtonText": "Login",
                "a_registrationButton": "Registration",
                "a_newRegistrationLabelText": "You are successfully registered",
                "a_loginErrorMessage": "Wrong login or password",
                "a_caption": "You are on the login page, your language: ",
                "a_boris": "Andrzhievsky Boris",
                "a_andrey": "Belichenko Andrey",
                "a_dmitry": "Medvedev Dmitry",
                "a_ivan": "Iuriev Ivan",
                "a_copyright": "All rights reserved",
                "a_forgotPassword": "Forgot password?",
                "a_modalPassword": "Password recovery",
                "a_modalLogin": "Login:",
                "a_modalKeyword": "Keyword:",
                "a_seach_Key_Word": "Search password",
                "a_givePasswordModal": "Your password: ",
                "b_loginError": "Enter more than five char and begin with a letter",
                "b_passwordError": "Password must be longer than 5 characters",
                "b_passwordMachError": "Password should match",
                "b_emailError": "Enter correct Email: like mymail@mail.com",
                "b_keyError": "Keyword length should be less than 5 and not more than 15",
                "b_phoneError": "Your number should start with \"+38\" and must be 13 characters long",
                "b_registrationFormTitle": "Registration",
                "b_loginPlaceholder": "Login",
                "b_password1Placeholder": "Password",
                "b_password2Placeholder": "Password again",
                "b_emailPlaceholder": "Email",
                "b_keyPlaceholder": "Keyword",
                "b_phonePlaceholder": "Phone number",
                "b_registrationButtonText": "Registration",
                "b_registrationBackText": "Back to authorization",
                "b_allFieldsCheck": "Fill in all the fields",
                "b_dbError":"DB Error",
                "b_errorLoginExist":"This login already in use",
                "acc_buttonImageSend": "Upload",
                "acc_changeDataForm" : "Change profile data",
                "acc_saveButtonText" : "Save",
                "acc_returnButtonText" : "Back",
                "acc_successfullyUpdate":"Your data was successfully updated",
                "acc_caption": "You are logged into your account, your language:",
                "acc_texteareaLabel": "Write about yourself:",
                "acc_keyword":"Keyword",
                "s_fn": "First name",
                "s_ln": "Last Name",
                "s_age": "Age",
                "s_ht": "City",
                "s_actions": "Actions",
                "s_language_text_label": "Language",
                "button_delete": "Delete",
                "button_update": "Update",
                "button_cansel": "Cansel",
                "s_createButton": "Create ",
                "s_teacher_login": "Hello, ",
                "s_createStudentError": "If you want to add new student please fill all inputs",
                "s_createStudentFieldsError": "Fields \"First Name\", \"Last Name\", \"Hometown\" must not contain numbers or symbols",
                "s_delete_all": "Clear selected table"
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
        password: inputPass.value,
        picture_url: ''
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
                localStorage.setItem("UserAvatar", "../src/server/uploads/"+responseArray[0].picture_url);
                utils.changeLocation(constants.pathStudentsPage);
            }
        }
    };
    xhr.send(JSON.stringify(requestBody));
}

function validateForm() {
    utils.validateInput(inputPass.value, inputLogin.value);
}

function rememberPassword() {

    let languageArray = helpers.getCurrentLanguagesSet();

    if(document.getElementById("inf_login").value === "" || document.getElementById("inf_keyword").value === "")
    {
        alert(languageArray.a_no_login_or_pass);
    }
    else{
        let answer = document.getElementById("answer");
        let requestBody = {
            login: document.getElementById("inf_login").value,
            keyword: document.getElementById("inf_keyword").value
        };
        xhr.open("POST", `${constants.server}password-forgot`);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let temp = JSON.parse(xhr.responseText);
                if (temp.length > 0) {
                    answer.innerText = temp[0].password;
                } else {
                    answer.innerText = languageArray.a_no_password;
                }
            }
        };
        xhr.send(JSON.stringify(requestBody));
    }
}

let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
modal.style.display = "block";
};

span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("inf_login").value = "";
    document.getElementById("inf_keyword").value = "";
    document.getElementById("answer").value = "";
};


    
     
     
     