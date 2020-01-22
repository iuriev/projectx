require("./styles/index.less");
const utils = require('./helpers/utils.js');
const constants = require('./static/constants')
const helpers = require('./helpers/helper');
let xhr = new XMLHttpRequest();
let fn;
let ln;
let age;
let ht;
window.addEventListener('load', function () {

    fn = document.getElementById('firstName');
    ln = document.getElementById('lastName');
    age = document.getElementById('age');
    ht = document.getElementById('homeTown');
    let languageArray = helpers.getCurrentLanguagesSet();
    document.getElementById('language-authorization').addEventListener('change', helpers.changeSelectedValue);
    document.getElementById('myLoginName').innerHTML = languageArray.s_teacher_login + localStorage.getItem("UserLogin");
    document.getElementById('btnCreate').addEventListener('click', function () {

        if (utils.validateCreateInput(fn.value, ln.value, ht.value, age.value)) {
            createStudent()
        }

    });
    document.getElementById('fullScreen').addEventListener('click', fullScreen);
    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('account').addEventListener('click', function () {
        utils.changeLocation(constants.pathAccount);
    });
    let e = document.getElementById("language-authorization");
    localStorage.getItem('language') === "RU" ?  e.selectedIndex = 0 : e.selectedIndex = 1;
    helpers.setStudentsPageLanguage();
    importStudent();
});

function fullScreen() {
    document.fullscreenElement ? document.exitFullscreen(): document.documentElement.requestFullscreen();
}

function logout() {
    localStorage.clear();
    utils.changeLocation(constants.pathAuthorizationPage);
}

function drawHeader() {
    let languageArray = helpers.getCurrentLanguagesSet();
    let col = [languageArray.s_fn, languageArray.s_ln, languageArray.s_age, languageArray.s_ht, languageArray.s_actions];
    let table = document.createElement("table");
    table.id = "mainTable";
    table.classList.add('table__dynamic')
    let tr = table.insertRow(-1);
    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");
        th.classList.add('th')
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    let divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function drawtable(temp) {
    drawHeader();
    let col = [];
    for (let i = 0; i < temp.length; i++) {
        for (let key in temp[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    let table = document.getElementById("mainTable");
    for (let k = 0; k < temp.length; k++) {
        let tr = table.insertRow(-1);
        for (let j = 1; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.classList.add('tabCell');
            tabCell.id = col[j] + temp[k][col[0]];
            tabCell.innerHTML = temp[k][col[j]];
        }
        let languageArray = helpers.getCurrentLanguagesSet();
        let btnUpdate = document.createElement("button");
        btnUpdate.id = "updateBtn" + temp[k][col[0]];
        btnUpdate.innerHTML = languageArray.button_update;
        btnUpdate.classList.add('update-btn');
        btnUpdate.addEventListener('click', updatePreparation);
        tr.appendChild(btnUpdate);

        let btnDelete = document.createElement("button");
        btnDelete.id = "deleteBtn" + temp[k][col[0]];
        btnDelete.innerHTML = languageArray.button_delete;
        btnDelete.classList.add('delete-btn');
        btnDelete.addEventListener('click', deleteStudent);
        tr.appendChild(btnDelete);
    }

    let divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function updatePreparation() {

    let id = this.id.substring(9, this.id.length);
    let fn = document.getElementById('fn' + id);
    let fnText = fn.textContent;
    fn.innerHTML = `<input type='text' id = inputFn${id} value = ${fnText} >`;
    let ln = document.getElementById('ln' + id);
    let lnText = ln.textContent;
    ln.innerHTML = `<input type='text'  id = inputLn${id} value= ${lnText} >`;
    let age = document.getElementById('age' + id);
    let ageText = age.textContent;
    age.innerHTML = `<input type='number'  id = inputAge${id} value= ${ageText} >`;
    let ht = document.getElementById('ht' + id);
    let htText = ht.textContent;
    ht.innerHTML = `<input type='text' id = inputHt${id}  value= ${htText} >`;
    let parent = this.parentNode;
    let languageArray = helpers.getCurrentLanguagesSet();
    let buttonSave = document.createElement('button');
    buttonSave.innerHTML = languageArray.acc_saveButtonText;
    buttonSave.id = `save${id}`;
    buttonSave.classList.add('save-btn')
    parent.replaceChild(buttonSave, this);
    buttonSave.after(this);
    buttonSave.addEventListener('click', updateStudent);
    let buttonCancel = document.createElement('button');
    buttonCancel.innerHTML = languageArray.button_cansel;
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
    let id = localStorage.getItem("UserID");
    xhr.open("GET", `${constants.server}all-students?id=${id}`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let temp = JSON.parse(xhr.responseText);
            drawtable(temp);
        }
    };
    xhr.send();
}

function createStudent() {

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

function updateStudent() {
    var id = this.id.substring(4, this.id.length);
    var requestBody = {
        id: id,
        fn: document.getElementById(`inputFn${id}`).value,
        ln: document.getElementById(`inputLn${id}`).value,
        age: document.getElementById(`inputAge${id}`).value,
        ht: document.getElementById(`inputHt${id}`).value
    };
    if (utils.validateCreateInput(requestBody.fn, requestBody.ln, requestBody.ht, requestBody.age)) {
        xhr.open("POST", `${constants.server}update-student-info`, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                importStudent();
            }
        };
        xhr.send(JSON.stringify(requestBody));
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

