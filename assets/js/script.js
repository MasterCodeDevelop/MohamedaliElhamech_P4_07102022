// DOM Elements
const modalbg = document.querySelector(".bground"),
modalBtn = document.querySelectorAll(".modal-btn"),
formData = document.querySelectorAll(".formData"),
close = document.querySelector(".close"),
submit = document.querySelector(".btn-submit"),
first = document.getElementById("first");

// Regex
const RegName = /^[a-zA-Z\- ]{2,20}$/i;

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

// verify First Name
first.addEventListener("change", () => verifyFirstName());
const verifyFirstName = () => {
  let { value, parentElement } = first,
  length = value.length - (value.split(" ").length-1);

  if (length == 0) displayDataError(parentElement, "Veuillez entrer votre prénom.");
  else if (length < 2) displayDataError(parentElement, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
  else if (!RegName.test(value)) displayDataError(parentElement, "Veuillez entrer un prénom correct.");
  else return removeDataErrror(parentElement);
}

// Verify last Name
last.addEventListener("change", () => verifyLastName());
const verifyLastName = () => {

  let { value, parentElement } = last,
  length = value.length - (value.split(" ").length-1);

  if (length == 0) displayDataError(parentElement, "Veuillez entrer votre nom.");
  else if (length < 2) displayDataError(parentElement, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  else if (!RegName.test(value)) displayDataError(parentElement, "Veuillez entrer un nom correct.");
  else return removeDataErrror(parentElement);
} 

// if the  submitted form
submit.addEventListener("click", (e) => {
  e.preventDefault();
  if(verifyFirstName() && verifyLastName()) {
    console.log('form is OK !')
  }
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

// displays the error message
function displayDataError(parentElement, message) {
  parentElement.setAttribute("data-error",message);
  parentElement.setAttribute("data-error-visible", "true");
}

// removes the error message
function removeDataErrror(parentElement) {
  if (parentElement.getAttribute("data-error") || parentElement.getAttribute("data-error-visible")) {
    parentElement.removeAttribute("data-error");
    parentElement.removeAttribute("data-error-visible");
  }
  return true;
}