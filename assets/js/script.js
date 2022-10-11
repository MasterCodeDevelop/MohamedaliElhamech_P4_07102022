// DOM Elements
const modalbg = document.querySelector(".bground"),
modalBtn = document.querySelectorAll(".modal-btn"),
formData = document.querySelectorAll(".formData"),
close = document.querySelector(".close"),
submit = document.querySelector(".btn-submit"),
first = document.getElementById("first"),
email = document.getElementById("email"),
birthDate = document.getElementById("birthdate"),
quantity = document.getElementById("quantity"),
eventLocation = document.querySelectorAll(".checkbox-input[name='location']"),
condition = document.querySelector("#checkbox1");



// Regex
const RegName = /^[a-zA-Z\- ]{2,20}$/i,
RegMail = /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/i;

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

// Verify Email
email.addEventListener("change", () => verifyMail())
const verifyMail = () => {
  let { value, parentElement } = email;
  if (value.length == 0) displayDataError(parentElement, "Veuillez entrer votre adresse email");
  else if (!RegMail.test(value)) displayDataError(parentElement, "Votre adresse email est incorrect");
  else return removeDataErrror(parentElement);
} 

// Verify bith date
birthDate.addEventListener("change", () => verifyBirthDate());
const verifyBirthDate = () => {
  let { value, parentElement } = birthDate,
  inputDate = new Date(value),
  today = new Date(),
  validDate = (age) => {
    return new Date(
      today.getFullYear()-age,
      today.getMonth(),
      today.getDate(),
      today.getHours(),
      today.getMinutes()
    );
  }; 
  // min 3 years and max 100 years
  const min = validDate(3), max = validDate(100);

  if (value.length == 0) displayDataError(parentElement, "Vous devez entrer votre date de naissance.");
  else if (inputDate < max || inputDate > min ) displayDataError(parentElement, "Votre date de naissance est inccorect ! vous devez avoir entre 3 et 100 ans.");
  else return removeDataErrror(parentElement);
}

// verify the number of tournaments already played
quantity.addEventListener("change", () => verifyQuantity());
const verifyQuantity = () => {
  let {value, parentElement} = quantity;

  if (value.length == 0) {
    displayDataError(parentElement, "Veuillez entrer le nombre de tournois où quel vous avez déja participé.")
  } else if (value < 0 || value > 99 || !Number.isInteger(parseFloat(value)) ) {
    displayDataError(parentElement, "Vous devez saisir un numbre correct entre 0 et 99 compris")
  } else return removeDataErrror(parentElement);
}

// Verify checkBox of tournaments
for (const e of eventLocation) e.addEventListener("change", () => verifyCheckbox());
const verifyCheckbox = () => {
  let checked = false,
  parentElement = eventLocation[0].parentElement;

  for (const e of eventLocation) {
    if(e.checked) checked = true;
  }

  if (!checked) displayDataError(parentElement, "Vous devez choisir une option.");
  else return removeDataErrror(parentElement);
}

// verify the condition
condition.addEventListener("change", () => verifyCondition())
const verifyCondition = () => {
  let { checked, parentElement } = condition;

  if (!checked) displayDataError(parentElement, "Vous devez vérifier que vous acceptez les termes et conditions");
  else return removeDataErrror(parentElement);
}

// if the submitted form
submit.addEventListener("click", (e) => {
  e.preventDefault();
  if( verifyFirstName() && verifyLastName() && verifyMail() && verifyBirthDate() && verifyQuantity() && verifyCheckbox() && verifyCondition() ) {
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