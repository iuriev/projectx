window.onload = function () {
    document.getElementById('regText').hidden = localStorage.getItem("regSuccess") === null;
    document.getElementById('login').addEventListener('click', personLogin);
    document.getElementById('register').addEventListener('click', sentToRegPage);
};

function sentToRegPage() {
    console.log("adsdsada");
    window.location.href = 'registration.html';
}

function personLogin() {
    var login = document.getElementById('inputlogin').value;
    var password = document.getElementById('inputpassword').value;
    if (login.length >= 1 && password.length >= 1) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3001/login');
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 && xhr.responseText === "SERVER ERROR") {
                    alert("Ошибка на сервере БД");
                } else if (xhr.status === 200 && xhr.responseText === "LOGIN ERROR") {
                    alert("Неверный логин или пароль");
                } else if (xhr.status === 200) {
                    var temp = JSON.parse(xhr.responseText);
                    localStorage.setItem("UserID", temp[0].id)
                    window.location.href = 'students.html';
                }
            }
        };
        xhr.send("login=" + login + "&password=" + password);
    } else {
        alert("Введите логин и пароль");
    }
}


