window.onload = function () {
     importStudent();
    //sortStudents();
    // mapStudents();
    // filterStudents();
    //reduceStudents ();
    //foreachStudents();
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
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.classList.add('table__dynamic')
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr = table.insertRow(-1);                  // TABLE ROW.
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.classList.add('th')
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < temp.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.classList.add('tabCell')
            tabCell.innerHTML = temp[i][col[j]];
        }
    }
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
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
                //  var temp = JSON.parse(xhr.responseText);
                //  console.log(temp);
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
                //    var temp = JSON.parse(xhr.responseText);
                //    console.log(temp);
            }
        }
        xhr.send("id=" + id + "&fn=" + fn + "&ln=" + ln + "&age=" + age + "&ht=" + ht);
        importStudent();
    }
}

function deleteStudent() {
    var id = document.getElementById('studentId').value;
    //  console.log
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

function sortStudents() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3001/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var temp = JSON.parse(xhr.responseText);
            temp.sort(function (a, b) {
                if (a.ln > b.ln) {
                    return 1;
                } else {
                    return -1;
                }
            });
            drawtable(temp);
        }
    }
    xhr.send();
}

function mapStudents() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3001/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            var temp = JSON.parse(xhr.responseText);

            //  var res = temp.map(function(a){

            var res = temp;

            var res = temp.map(function (a) {
                return
                a.ln.toUpperCase();
            });

            console.log(res);

            drawtable(temp);
        }
    }
    xhr.send();
}

function filterStudents() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3001/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {


            var temp = JSON.parse(xhr.responseText);

            var res = temp.filter(function (a) {
                return a.age > 25;
            });

            console.log(res);

            drawtable(res);
        }
    }
    xhr.send();
}

function reduceStudents() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3001/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {

            var temp = JSON.parse(xhr.responseText);

            var t = temp.reduce((prev, item) => prev + item.ln.length, 0);


            drawtable(temp);
            console.log(t);
        }
    }
    xhr.send();
}

function foreachStudents() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3001/', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {//Вызывает функцию при смене состояния.
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {

            var temp = JSON.parse(xhr.responseText);

            temp.forEach(function (slide) {

                var node = document.createElement("dt");
                var textnode = document.createTextNode("name");
                var node2 = document.createElement("dd");  // Create a <li> node
                var textnode2 = document.createTextNode(slide.ln);
                node.appendChild(textnode);// Create a text node
                node2.appendChild(textnode2);                              // Append the text to <li>
                document.getElementById("myDl").appendChild(node);     // Append <li> to <ul> with id="myList"
                document.getElementById("myDl").appendChild(node2);
            });
        }
    }
    xhr.send();
}
























