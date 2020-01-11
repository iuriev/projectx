document.getElementById('registration_registerBtn').addEventListener('click', personRegister);
function personRegister(){
       var loginReg = document.getElementById('loginReg').value;
         var passwordReg1 = document.getElementById('passwordReg1').value;
         var passwordReg2 = document.getElementById('passwordReg2').value;
        var emailReg = document.getElementById('emailReg').value;
        var telReg = document.getElementById('telReg').value;
        if(passwordReg2.value === passwordReg1.value){
               if( loginReg !== '' && loginReg.length > 2 &&
                        passwordReg1 !== '' && passwordReg1.length > 2 &&
                          // emailReg.value !== '' && emailReg.value.includes('@') &&
                          telReg.value !== ""){
                            var xhr = new XMLHttpRequest();
                           xhr.open("POST", 'http://localhost:3001/createTeacher');
                            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            xhr.onreadystatechange = function () {
                                    if (xhr.readyState === 4) {
                                        if (xhr.status === 200 && xhr.responseText === "") {
                                                  alert("Вы зарегались");
                                              }
                                           if (xhr.status === 200 && xhr.responseText === "ID ERROR") {
                                               alert("Error");
                                          }
                                      }
                                };
                            xhr.send("login=" + loginReg + "&password=" + passwordReg1 + "&email=" + emailReg + "&phone=" + telReg);
                            console.log("login=" + loginReg + "&password=" + passwordReg1 + "&email=" + emailReg + "&phone" + telReg);
                        }
            }else{
                 alert("Ошибка в веденных вами данными");
             }
        }