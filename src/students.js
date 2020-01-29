require("./styles/index.less");
const utils = require('./helpers/utils.js');
const constants = require('./static/constants');
const helpers = require('./helpers/helper');
let xhr = new XMLHttpRequest();
let fn;
let ln;
let age;
let ht;

window.addEventListener('load', function () {
    getTeacherGroups();
    fn = document.getElementById('firstName');
    ln = document.getElementById('lastName');
    age = document.getElementById('age');
    ht = document.getElementById('homeTown');
    let languageArray = helpers.getCurrentLanguagesSet();
    document.getElementById('deleteStudentFromActiveGroup').addEventListener('click', deleteStudentFromActiveGroup);
    document.getElementById('language-authorization').addEventListener('change', helpers.changeSelectedValue);
    document.getElementById('myLoginName').innerHTML = languageArray.s_teacher_login + localStorage.getItem("UserLogin");
    document.getElementById('fullScreen').addEventListener('click', fullScreen);
    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('btnCreate').addEventListener('click', function () {
        if (utils.validateCreateInput(fn.value, ln.value, ht.value, age.value)) {
            createStudent()
        }
    });

    document.getElementById('account').addEventListener('click', function () {
        utils.changeLocation(constants.pathAccount);
    });

    changeStudentsPageLanguage();
    createContainers();
    addTabsOnStudentsPage();
    drawtable();
    addAvatar();
});

function addAvatar(){
    let blockImg = document.getElementById('account');
    let imgFromServer = localStorage.getItem('UserAvatar');
    let img = document.createElement("img");
    if(localStorage.getItem('UserAvatar') !== "null"){
        img.setAttribute('src', imgFromServer);
    }else{
        img.setAttribute('src', '../assets/img/avatar.png');
    }
    blockImg.appendChild(img);
    img.classList.add("userImg");
}

function changeStudentsPageLanguage() {
    let e = document.getElementById("language-authorization");
    localStorage.getItem('language') === "RU" ? e.selectedIndex = 0 : e.selectedIndex = 1;
    helpers.setStudentsPageLanguage();
}

function addTabsOnStudentsPage() {
    let arr = JSON.parse(localStorage.getItem("teacherGroups"));
    if (arr.length < 3) {
        document.getElementById("addNewTab").addEventListener('click', createNewGroup);
    }

    let classname1 = document.getElementsByClassName("tabs__link");
    for (let i = 0; i < classname1.length; i++) {
        classname1[i].addEventListener('click', changetab, false);
        classname1[i].addEventListener('dblclick', changeTabName, false);
    }

    let classname = document.getElementsByClassName("deleteTabButton");
    for (let i = 0; i < classname.length; i++) {

        classname[i].addEventListener('click', deleteTab, false);
    }
}

function changeTabName() {
    let oldTab = this;
    let oldTabText = this.innerText;
    let oldTabId = this.id;
    let tabIndex = oldTabId[7];
    let tabClass = this.classList;
    let parent = this.parentNode;
    let input = document.createElement('input');
    let div = document.createElement('div');
    div.id = oldTabId;
    div.classList = tabClass;
    input.id = "inputTabName";
    input.value = oldTabText;
    parent.replaceChild(input, this);
    input.focus();
    input.onblur = function () {
        let newText = input.value;
        oldTab.innerText = newText;

        let deleteButton = document.createElement("button");
        deleteButton.id = "deleteButton" + tabIndex;
        deleteButton.classList.add("deleteTabButton");
        deleteButton.addEventListener('click', deleteTab, false);

        parent.replaceChild(oldTab, this);
        if(Number(tabIndex) === 1){
        }
        else{
            oldTab.append(deleteButton);
        }
        let arr = JSON.parse(localStorage.getItem("teacherGroups"));
        let arrNames = JSON.parse(localStorage.getItem("teacherGroupsNames"));
        arrNames[tabIndex - 1] = newText;
        localStorage.setItem("teacherGroupsNames", arrNames)
        let requestBody = {
            id: arr[tabIndex - 1],
            name: newText
        };

        xhr.open("POST", `${constants.server}save-group-name`, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                getTeacherGroups();
                cansel();
            }
        };
        xhr.send(JSON.stringify(requestBody));

    };
}
function deleteStudentFromActiveGroup() {

    let activeTab = localStorage.getItem("activeTab");
    let arr = JSON.parse(localStorage.getItem("teacherGroups"));
    let groupId = arr [activeTab-1];
    let requestBody = {
        groupId: groupId
    };
    console.log(groupId)
    xhr.open("POST", `${constants.server}delete-all-students-from-group`, false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            getTeacherGroups();
            cansel();
        }
    };
    xhr.send(JSON.stringify(requestBody));
}

function deleteTab() {

    let arr = JSON.parse(localStorage.getItem("teacherGroups"));
    let tab_id = this.id.slice(-1);
    let id = arr[tab_id - 1];
    let requestBody = {
        id: id
    };
    xhr.open("POST", `${constants.server}delete-group`, false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            getTeacherGroups();
            cansel();
        }
    };
    xhr.send(JSON.stringify(requestBody));
}

function createNewGroup() {

    let requestBody = {
        id: localStorage.getItem("UserID")
    };
    xhr.open("POST", `${constants.server}create-new-group`, false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            getTeacherGroups();
            cansel();
        }
    };
    xhr.send(JSON.stringify(requestBody));
}

function changetab() {
    let tab2 = document.getElementById("content-2");
    let tab3 = document.getElementById("content-3");
    switch (this.id[7]) {
        case '1':
            localStorage.setItem("activeTab", 1);
            document.getElementById("content-1").classList.add("tabs__pane_show");
            if (tab2) {
                tab2.classList.remove("tabs__pane_show");
                document.getElementById("content2").classList.remove('tabs__link_active');
            }
            if (tab3) {
                tab3.classList.remove("tabs__pane_show");
                document.getElementById("content3").classList.remove('tabs__link_active');
            }
            document.getElementById("content1").classList.add('tabs__link_active');
            break;
        case '2':
            localStorage.setItem("activeTab", 2);
            document.getElementById("content-1").classList.remove("tabs__pane_show");
            document.getElementById("content-2").classList.add("tabs__pane_show");
            document.getElementById("content1").classList.remove('tabs__link_active');
            document.getElementById("content2").classList.add('tabs__link_active');
            if (tab3) {
                tab3.classList.remove("tabs__pane_show");
                document.getElementById("content3").classList.remove('tabs__link_active');
            }
            break;
        case '3':
            localStorage.setItem("activeTab", 3);
            document.getElementById("content-1").classList.remove("tabs__pane_show");
            document.getElementById("content-2").classList.remove("tabs__pane_show");
            document.getElementById("content-3").classList.add("tabs__pane_show");
            document.getElementById("content1").classList.remove('tabs__link_active');
            document.getElementById("content2").classList.remove('tabs__link_active');
            document.getElementById("content3").classList.add('tabs__link_active');
    }
}

function createContainers() {

    let arr = JSON.parse(localStorage.getItem("teacherGroups"));
    let arrNames = JSON.parse(localStorage.getItem("teacherGroupsNames"));
    let nav = document.getElementById('tab-nav');
    let tableField = document.getElementById('tabs__content');
    for (let a = 1; a < arr.length + 1; a++) {
        let newTab = document.createElement('div');
        if (a === 1) {
            newTab.innerHTML = arrNames[a - 1]
        } else {
            newTab.innerHTML = arrNames[a - 1] + "<button id = 'deleteButton" + a + "' class='deleteTabButton'></button>";
        }
        newTab.href = "#content" + a;
        newTab.id = "content" + a;
        newTab.classList = "tabs__link";
        nav.append(newTab);

        let panel = document.createElement('div');
        panel.id = "content-" + a;
        panel.classList.add("tabs__pane");
        let curr = localStorage.getItem("activeTab");
        if (Number(curr) === a) {
            newTab.classList = "tabs__link tabs__link_active";
            panel.classList.add("tabs__pane_show");
        }
        tableField.append(panel);
    }

    if (arr.length < 3) {
        let addButton = document.createElement('button');
        addButton.innerText = "+";
        addButton.classList = "add-new-tab";
        addButton.id = "addNewTab";
        nav.append(addButton);
    }
}

function fullScreen() {
    document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
}

function logout() {
    localStorage.clear();
    utils.changeLocation(constants.pathAuthorizationPage);
}

function drawHeader(a) {
    let languageArray = helpers.getCurrentLanguagesSet();
    let col = [languageArray.s_fn, languageArray.s_ln, languageArray.s_age, languageArray.s_ht, languageArray.s_actions];
    let table = document.createElement("table");
    table.id = "mainTable" + a;
    table.classList.add('table__dynamic')
    let tr = table.insertRow(-1);
    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");
        th.classList.add('th')
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    let divContainer = document.getElementById("content-" + a);
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function drawtable() {
    let arr = JSON.parse(localStorage.getItem("teacherGroups"));
    for (let a = 1; a < arr.length + 1; a++) {
        importStudent(arr[a - 1]);
        let temp = JSON.parse(localStorage.getItem("tabledata" + arr[a - 1]));
        drawHeader(a);
        let col = [];
        for (let i = 0; i < temp.length; i++) {
            for (let key in temp[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        let table = document.getElementById("mainTable" + a);
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
        let divContainer = document.getElementById("content-" + a);
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }

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

function getTeacherGroups(){
    localStorage.setItem("activeTab", 1);
    let id = localStorage.getItem("UserID");
    xhr.open("GET", `${constants.server}teacher-groups?id_teacher=${id}`, false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let arrNumbers = [];
            let arrNames = [];
            let temp = JSON.parse(xhr.responseText);
            for (let i = 0; i < temp.length; i++) {
                arrNumbers.push(temp[i].id_group)
                arrNames.push(temp[i].name)
            }
            localStorage.setItem("teacherGroups", JSON.stringify(arrNumbers));
            localStorage.setItem("teacherGroupsNames", JSON.stringify(arrNames));
        }
    };
    xhr.send();
}

function importStudent(id_group) {
    xhr.open("GET", `${constants.server}all-students?id_group=${id_group}`, false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let temp = JSON.parse(xhr.responseText);
            localStorage.setItem("tabledata" + id_group, JSON.stringify(temp));
        }
    };
    xhr.send();
}

function createStudent() {
    let tab = document.getElementsByClassName('tabs__link_active');
    let tab_id = tab[0].href.slice(-1);
    let arr = JSON.parse(localStorage.getItem("teacherGroups"));
    let id_group = arr[tab_id - 1];
    let requestBody = {
        fn: fn.value,
        ln: ln.value,
        age: age.value,
        ht: ht.value,
        id_group: id_group
    };
    xhr.open("POST", `${constants.server}create-student`);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            drawtable();
        }
    };
    xhr.send(JSON.stringify(requestBody));
}

function updateStudent() {
    let id = this.id.substring(4, this.id.length);
    let requestBody = {
        id: id,
        fn: document.getElementById(`inputFn${id}`).value,
        ln: document.getElementById(`inputLn${id}`).value,
        age: document.getElementById(`inputAge${id}`).value,
        ht: document.getElementById(`inputHt${id}`).value
    };
    if (utils.validateCreateInput(requestBody.fn, requestBody.ln, requestBody.ht, requestBody.age)) {
        xhr.open("POST", `${constants.server}update-student-info`, false);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                drawtable();
            }
        };
        xhr.send(JSON.stringify(requestBody));
    }
}

function deleteStudent() {
    let requestBody = {
        id: this.id.substring(9, this.id.length)
    };
    xhr.open("POST", `${constants.server}delete-student`, false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            drawtable();
        }
    };
    xhr.send(JSON.stringify(requestBody));
}