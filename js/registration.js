document.getElementById('registerBtn').addEventListener('click', teacherRegister);

function teacherRegister() {
    var loginReg = document.getElementById('loginReg').value;
    var passwordReg1 = document.getElementById('passwordReg1').value;
    var passwordReg2 = document.getElementById('passwordReg2').value;
    var emailReg = document.getElementById('emailReg').value;
    var telReg = document.getElementById('telReg').value;

    if (loginReg !== "" && passwordReg1 !== "" && passwordReg2 !== "" && emailReg !== "" && telReg !== "") {
        if (passwordReg1.length > 2 || passwordReg2.length > 2) {
            if (passwordReg2 === passwordReg1) {
                if (loginReg.length > 2) {
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", 'http://localhost:3001/createTeacher');
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200 && xhr.responseText === "") {
                                localStorage.setItem("regSuccess", 1);
                                window.location.href = 'index.html';
                            }
                            if (xhr.status === 200 && xhr.responseText === "LOGIN ERROR") {
                                alert("Такой логин уже занят");
                            }
                        }
                    };
                    xhr.send("login=" + loginReg + "&password=" + passwordReg1 + "&email=" + emailReg + "&phone=" + telReg);
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