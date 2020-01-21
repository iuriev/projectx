require("./styles/index.less");
var utils = require('./helpers/utils.js');
var constants = require('./static/constants')
var xhr;
var fn;
var ln;
var age;
var ht;

window.addEventListener('load', function(){
    xhr = new XMLHttpRequest();
    fn = document.getElementById('firstName');
    ln = document.getElementById('lastName');
    age = document.getElementById('age');
    ht = document.getElementById('homeTown')
    importStudent();
    document.getElementById('myLoginName').innerHTML = 'Login as ' + localStorage.getItem("UserLogin");
    document.getElementById('btnCreate').addEventListener('click', function() {
        
        if(utils.validateCreateInput(fn.value, ln.value, ht.value, age.value)) {
            createStudent()
        }
        
    });
    document.getElementById('fullScreen').addEventListener('click', fullScreen);
    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('account').addEventListener('click', function() {
        utils.changeLocation(constants.pathAccount);
    })
});


function fullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}


function logout() {
    localStorage.clear();
    utils.changeLocation(constants.pathAuthorizationPage);
}

function drawHeader() {
    var col = ["First Name", "Last Name", "Age", "Hometown", "Actions"];
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
    for (var k = 0; k < temp.length; k++) {
        tr = table.insertRow(-1);
        for (var j = 1; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.classList.add('tabCell');
            tabCell.id = col[j] + temp[k][col[0]];
            tabCell.innerHTML = temp[k][col[j]];
        }

        var btnUpdate = document.createElement("button");
        btnUpdate.id = "updateBtn" + temp[k][col[0]];
        btnUpdate.innerHTML = "Update";
        btnUpdate.classList.add('update-btn');
        btnUpdate.addEventListener('click', updatePreparation);
        tr.appendChild(btnUpdate);

        var btnDelete = document.createElement("button");
        btnDelete.id = "deleteBtn" + temp[k][col[0]];
        btnDelete.innerHTML = "Delete";
        btnDelete.classList.add('delete-btn');
        btnDelete.addEventListener('click', deleteStudent);
        tr.appendChild(btnDelete);
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function updatePreparation() {

    var id = this.id.substring(9, this.id.length);

    var fn = document.getElementById('fn' + id);
    var fnText = fn.textContent;
    fn.innerHTML = `<input type='text' id = inputFn${id} value = ${fnText} >`;

    var ln = document.getElementById('ln' + id);
    var lnText = ln.textContent;
    ln.innerHTML = `<input type='text'  id = inputLn${id} value= ${lnText} >`;

    var age = document.getElementById('age' + id);
    var ageText = age.textContent;
    age.innerHTML = `<input type='number'  id = inputAge${id} value= ${ageText} >`;

    var ht = document.getElementById('ht' + id);
    var htText = ht.textContent;
    ht.innerHTML = `<input type='text' id = inputHt${id}  value= ${htText} >`;
    
    var parent = this.parentNode;

    var buttonSave = document.createElement('button');
    buttonSave.innerHTML = 'Save';
    buttonSave.id = `save${id}`;
    buttonSave.classList.add('save-btn')
    parent.replaceChild(buttonSave, this);
    buttonSave.after(this);
    buttonSave.addEventListener('click', updateStudent);

    var buttonCancel = document.createElement('button');
    buttonCancel.innerHTML = 'Cansel';
    buttonCancel.classList.add('cancel-btn')
    buttonCancel.id = `cansel${id}`;
    buttonCancel.addEventListener('click', cansel);
    parent.replaceChild(buttonCancel, this);
    buttonCancel.after(this);
    this.remove();
}

function cansel() {
    document.location.reload();
}

function importStudent() {
    var id = localStorage.getItem("UserID");
    xhr.open("GET", `${constants.server}all-students?id=${id}`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
        if (xhr.readyState === 4 && xhr.status === 200) {
            var temp = JSON.parse(xhr.responseText);
            drawtable(temp);
        }
    };
    xhr.send();
}

function createStudent() {
    
    if (!fn || !ln || !age || !ht) {
        alert("If you want to add new student please fill all inputs");
    } else {
        var userID = localStorage.getItem("UserID");
        var requestBody = {
            fn: fn.value,
            ln: ln.value,
            age: age.value,
            ht: ht.value,
            teacherId: userID
        };
        xhr.open("POST", `${constants.server}create-student`);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                importStudent();
            }
        };
        
        xhr.send(JSON.stringify(requestBody));
    }
}

function updateStudent() {
    var id = this.id.substring(4, this.id.length);
    var requestBody = {
        id: id,
        fn: document.getElementById(`inputFn${id}`).value,
        ln: document.getElementById(`inputLn${id}`).value,
        age: document.getElementById(`inputAge${id}`).value,
        ht: document.getElementById(`inputHt${id}`).value
    };
    if(utils.validateCreateInput(requestBody.fn, requestBody.ln, requestBody.ht, requestBody.age)){
        xhr.open("POST", `${constants.server}update-student-info`, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
                importStudent();
        }
    };
    xhr.send(JSON.stringify(requestBody));
    } else {
        return;
    }
    
    
}
function deleteStudent() {
    var requestBody = {
        id: this.id.substring(9, this.id.length)
    };
    xhr.open("POST", `${constants.server}delete-student`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            importStudent();
        }
    };
    xhr.send(JSON.stringify(requestBody));
}

