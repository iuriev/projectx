document.getElementById('registerBtn').addEventListener('click', teacherRegister);
require("./styles/index.less");
function teacherRegister() {
    var login = document.getElementById('loginReg').value;
    var password1 = document.getElementById('passwordReg1').value;
    var password2 = document.getElementById('passwordReg2').value;
    var email = document.getElementById('emailReg').value;
    var phone = document.getElementById('telReg').value;

    if (login !== "" && password1 !== "" && password2 !== "" && email !== "" && phone !== "") {
        if (password1.length > 2 || password2.length > 2) {
            if (password2 === password1) {
                if (login.length > 2) {
                    var xhr = new XMLHttpRequest();
                    var requestBody = {
                        login: login,
                        password: password1,
                        email: email,
                        phone: phone
                    };
                    xhr.open("POST", 'http://localhost:3001/createTeacher');
                    xhr.setRequestHeader("Content-type", "application/json");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200 && xhr.responseText === "") {
                                localStorage.setItem("regSuccess", 1);
                                window.location.href = 'authorization.html';
                            }
                            if (xhr.status === 500 && xhr.responseText === "LOGIN ERROR") {
                                alert("Такой логин уже занят");
                            }
                        }
                    };
                    xhr.send(JSON.stringify(requestBody));
                } else {
                    alert("Логин должен быть длиннее 3 символа");
                }
            } else {
                alert("Пароли не совпадают");
            }
        } else {
            alert("Пароли должны быть длиной более 2 символов");
        }
    } else {
        alert("Заполните все поля");
    }
}