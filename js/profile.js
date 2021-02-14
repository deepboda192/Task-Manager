
data = JSON.parse(localStorage.getItem('Data'));

if (data) {
    currentLoginData = data.filter(user => (user.email == localStorage.getItem("active")))[0];
    document.getElementById("profile-name").value = currentLoginData.name;
    document.getElementById("profile-email").value = currentLoginData.email;
    document.getElementById("profile-mobile").value = currentLoginData.mobile;
    document.getElementById("profile-password").value = currentLoginData.password;
}

function updateValues() {

    currData = data.filter(user => (user.email == localStorage.getItem("active")))[0];

    console.log(currData);

    currData.name = document.getElementById("profile-name").value;
    currData.email = document.getElementById("profile-email").value;
    currData.mobile = document.getElementById("profile-mobile").value;
    currData.password = document.getElementById("profile-password").value;

    console.log(data);

    localStorage.setItem('Data', JSON.stringify(data));
    alert("Updated");
}
