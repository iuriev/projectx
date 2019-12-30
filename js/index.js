window.onload = function () {
    importStudent();
    document.getElementById('btnRead').disabled = true;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnCreate').addEventListener('click', createStudent);
});
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnUpdate').addEventListener('click', updateStudent);
});
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnDelete').addEventListener('click', deleteStudent);
});

function drawtable(temp) {
    var col = [];
    for (var i = 0; i < temp.length; i++) {
        for (var key in temp[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.createElement("table");
    table.classList.add('table__dynamic')

    var tr = table.insertRow(-1);
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.classList.add('th')
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < temp.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.classList.add('tabCell')
            tabCell.innerHTML = temp[i][col[j]];
        }
    }
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function importStudent() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3001/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var temp = JSON.parse(xhr.responseText);
            drawtable(temp);
        }
    }
    xhr.send();
}

function createStudent() {
    var fn = document.getElementById('firstName').value;
    var ln = document.getElementById('lastName').value;
    var age = document.getElementById('age').value;
    var ht = document.getElementById('homeTown').value;

    if (fn === "" || ln === "" || age === "" || ht === "") {
        alert("Field must be field");
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3001/create', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            }
        }
        xhr.send("fn=" + fn + "&ln=" + ln + "&age=" + age + "&ht=" + ht);
        importStudent();
    }
}

function updateStudent() {
    var id = document.getElementById('studentId').value;
    var fn = document.getElementById('firstName').value;
    var ln = document.getElementById('lastName').value;
    var age = document.getElementById('age').value;
    var ht = document.getElementById('homeTown').value;

    if (id === "" || fn === "" || ln === "" || age === "" || ht === "") {
        alert("Field must be field");

    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3001/update', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            }
        }
        xhr.send("id=" + id + "&fn=" + fn + "&ln=" + ln + "&age=" + age + "&ht=" + ht);
        importStudent();
    }
}

function deleteStudent() {
    var id = document.getElementById('studentId').value;
    if (id === "") {
        alert("Field ID is empty");
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3001/delete', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            }
        }
        xhr.send("id=" + id);
        importStudent();
    }
}

























