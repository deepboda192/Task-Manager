function signout() {
  localStorage.removeItem("active");
  window.location.href = "./login.html";
}
