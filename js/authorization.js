window.onload = function (){
    document.getElementById('login').addEventListener('click', personLogin);
};

function personLogin(){
    var login = document.getElementById('inputLogin').value;
    var password = document.getElementById('inputPassword').value;
    if(login !== '' && login.length > 2 && password !== ''&& password.length > 2){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:3001/login');
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 && xhr.responseText === "") {
                    alert("Вы вошли");
                }
                if (xhr.status === 200 && xhr.responseText === "ID ERROR") {
                    alert("Error");
                }
            }
        };
        xhr.send("login=" + login + "&password=" + password);
    }else{
        alert("");
    }

}