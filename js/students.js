window.onload = function () {
    importStudent();
    document.getElementById('btnRead').disabled = true;
};
document.getElementById('btnCreate').addEventListener('click', createStudent);
document.getElementById('btnUpdate').addEventListener('click', updateStudent);
document.getElementById('btnDelete').addEventListener('click', deleteStudent);

function drawHeader() {

    var col = ["ID", "First Name", "Last Name", "Age", "City"];
    var table = document.createElement("table");
    table.id = "mainTable";
    table.classList.add('table__dynamic')
    var tr = table.insertRow(-1);
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.classList.add('th')
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function drawtable(temp) {

    drawHeader();
    var col = [];
    for (var i = 0; i < temp.length; i++) {
        for (var key in temp[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.getElementById("mainTable");

    for (var i = 0; i < temp.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.classList.add('tabCell');
            tabCell.innerHTML = temp[i][col[j]];
        }
    }
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function importStudent() {

    var id = localStorage.getItem("UserID");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3001/getStudents', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
        if (xhr.readyState === 4 && xhr.status === 200) {
            var temp = JSON.parse(xhr.responseText);
            drawtable(temp);
        }
    };
    xhr.send("id=" + id);

}

function createStudent() {
    var id = document.getElementById('studentId').value;
    var fn = document.getElementById('firstName').value;
    var ln = document.getElementById('lastName').value;
    var age = document.getElementById('age').value;
    var ht = document.getElementById('homeTown').value;

    if (id === "" || fn === "" || ln === "" || age === "" || ht === "") {
        alert("If you want to add new student please fill all inputs");
    } else {
        var UserID = localStorage.getItem("UserID");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3001/create');
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 && xhr.responseText === "") {
                    importStudent();
                }
                if (xhr.status === 200 && xhr.responseText === "ID ERROR") {
                    alert("This ID is already taken, please choose another ID");
                }
            }
        };
        xhr.send("id=" + id + "&fn=" + fn + "&ln=" + ln + "&age=" + age + "&ht=" + ht+ "&teacherId=" + UserID);
    }
}

function updateStudent() {
    var id = document.getElementById('studentId').value;
    var fn = document.getElementById('firstName').value;
    var ln = document.getElementById('lastName').value;
    var age = document.getElementById('age').value;
    var ht = document.getElementById('homeTown').value;

    if (id === "") {
        alert("To update student please enter student ID");
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3001/update', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 && xhr.responseText === "") {
                        importStudent();
                    }
                    if (xhr.status === 200 && xhr.responseText === "EMPTY") {
                        alert("Please enter data for updating");
                    }
                    if (xhr.status === 200 && xhr.responseText === "ID ERROR") {
                        alert(`Sorry, but there is now student with  ID = ${id}`);
                    }
                }
            };
        };
        xhr.send("id=" + id + "&fn=" + fn + "&ln=" + ln + "&age=" + age + "&ht=" + ht);
    }
}

function deleteStudent() {
    var id = document.getElementById('studentId').value;
    if (id === "") {
        alert("To delete student please enter student ID");
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3001/delete', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 && xhr.responseText === "") {
                    importStudent();
                }
                if (xhr.status === 200 && xhr.responseText === "ID ERROR") {
                    alert(`Sorry, but there is now student with  ID = ${id}`);
                }
            }
        };
        xhr.send("id=" + id);
    }
}














