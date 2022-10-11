// DOM Elements
const modalbg = document.querySelector(".bground"),
modalBtn = document.querySelectorAll(".modal-btn"),
formData = document.querySelectorAll(".formData"),
close = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// closes the modal
close.addEventListener("click", () => {
  modalbg.style.display = "none";
})

// allows you to change the status of topnav
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}