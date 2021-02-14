var a = new Array();

//storing value on local storage
function store() {

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var mobile = document.getElementById('mobile');

    var gender = document.getElementsByName('gender');
    var genderVal = '';
    for (let index = 0; index < gender.length; index++) {
        if (gender[index].checked) {
            genderVal = gender[index].value;
        }
    }

    var birthday = document.getElementById('birthday');
    var password = document.getElementById('password');

    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var emailregex = /\S+@\S+\.\S+/;
    var mobileregex = /^[0]?[789]\d{9}$/;
    var todos = [];


    localData = localStorage.getItem('Data');
    console.log(localData);

    if (localData) {
        a = JSON.parse(localData);
    }

    // validation

    if (name.value.length == 0) {
        alert('Enter your Name');
    }

    else if (email.value.length == 0) {
        alert('Enter Your Email');
    }

    else if (!email.value.match(emailregex)) {
        alert('Enter Correct Email');
    }

    else if (mobile.value.length == 0) {
        alert('Enter Your Mobile No.');
    }

    else if (mobile.value.length != 10) {
        alert('Enter 10 Digit Number Only');
    }

    else if (!mobile.value.match(mobileregex)) {
        alert('Your mobile number should be digit only');
    }

    else if (birthday.value.length == 0) {
        alert("you did not enter your birthdate");

    }

    else if (!password.value.match(numbers)) {
        alert('please add 1 number');

    }

    else if (!password.value.match(upperCaseLetters)) {
        alert('please add 1 uppercase letter');

    }

    else if (!password.value.match(lowerCaseLetters)) {
        alert('please add 1 lovercase letter');

    }

    // final validation for push 

    else {

        a.push({ 'name': name.value, 'email': email.value, 'mobile': mobile.value, 'gender': genderVal, 'birthday': birthday.value, 'password': password.value, 'todos': todos });

        localStorage.setItem('Data', JSON.stringify(a));
        window.location.replace('./login.html');
    }

}



//login checking

function check() {



    var stored1 = localStorage.getItem('Data');
    var storedVal = JSON.parse(stored1);
    // console.log(storedVal);

    var user_Mobile_Email = document.getElementById('user_mobile_email');
    var user_Password = document.getElementById('user_password');

    for (var i = 0; i < storedVal.length; i++) {
        // console.log(storedVal[i].email, storedVal[i].password);

        if ((user_Mobile_Email.value == storedVal[i].email || user_Mobile_Email.value == storedVal[i].mobile) && user_Password.value == storedVal[i].password) {
            localStorage.setItem('active', storedVal[i].email);
            alert('You are logged in.');
            window.location.replace('./index.html');
            break;
        }
        else if (i == (storedVal.length - 1)) {
            console.log(i);
            alert('Error on login');
        }
    }




}









