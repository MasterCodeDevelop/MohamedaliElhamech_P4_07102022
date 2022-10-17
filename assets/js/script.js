// DOM Elements
const body = document.querySelector("body"),
header = document.getElementById("header"),
navbarToggler = document.getElementById("navbar-toggler"),
modal = document.querySelector("#modal"),
btnSignup = document.querySelectorAll(".btn-signup"),
modalBody = document.querySelector(".modal-body"),
close = document.querySelector(".close"),
form = document.querySelector("form"),
submit = document.querySelector(".btn-submit"),
firstName = document.getElementById("firstName"),
lastName = document.getElementById("lastName"),
email = document.getElementById("email"),
birthDate = document.getElementById("birthdate"),
quantity = document.getElementById("quantity"),
eventLocation = document.querySelectorAll(".radio-input[name='location']"),
condition = document.querySelector("#checkbox1");

// Regex
const RegName = /^[a-zA-Z\- ]{2,20}$/i,
RegMail = /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/i;

// launch/Display the mobile navbar
navbarToggler.addEventListener("click", () => {
  header.classList.toggle("is-open");
})

// launch modal event
btnSignup.forEach((btn) => btn.addEventListener("click", () => {
  body.classList.add("scroll-hidden");
  modal.classList.add("is-open");
}));

// closes the modal
close.addEventListener("click", () => {
  body.classList.remove("scroll-hidden");
  modal.classList.remove("is-open")
})

// verify First Name
firstName.addEventListener("change"&&"focusout", () => verifyFirstName());
const verifyFirstName = () => {
  let { value, parentElement } = firstName,
  length = value.length - (value.split(" ").length-1);

  if (length == 0) displayDataError(parentElement, "Veuillez entrer votre prénom.");
  else if (length < 2) displayDataError(parentElement, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
  else if (length > 40) displayDataError(parentElement, "Votre prénom doit avoir au maximum 40 caractères.");
  else if (!RegName.test(value)) displayDataError(parentElement, "Veuillez entrer un prénom correct.");
  else return removeDataErrror(parentElement);
}

// Verify last Name
lastName.addEventListener("change"&&"focusout", () => verifyLastName());
const verifyLastName = () => {

  let { value, parentElement } = lastName,
  length = value.length - (value.split(" ").length-1);

  if (length == 0) displayDataError(parentElement, "Veuillez entrer votre nom.");
  else if (length < 2) displayDataError(parentElement, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  else if (length > 40) displayDataError(parentElement, "Votre nom doit avoir au maximum 40 caractères.");
  else if (!RegName.test(value)) displayDataError(parentElement, "Veuillez entrer un nom correct.");
  else return removeDataErrror(parentElement);
}  

// Verify Email
email.addEventListener("change"&&"focusout", () => verifyMail())
const verifyMail = () => {
  let { value, parentElement } = email;
  if (value.length == 0) displayDataError(parentElement, "Veuillez entrer votre adresse email");
  else if (length > 100) displayDataError(parentElement, "Votre email doit avoir au maximum 100 caractères.");
  else if (!RegMail.test(value)) displayDataError(parentElement, "Votre adresse email est incorrect");
  else return removeDataErrror(parentElement);
} 

// Verify bith date
birthDate.addEventListener("change"&&"focusout", () => verifyBirthDate());
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
quantity.addEventListener("change"&&"focusout", () => verifyQuantity());
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
    
    const div = document.createElement("div");
    form.style.display = "none";
    
    // create a new message of success
    const alert = document.createElement("h1");
    alert.style.fontWeight = 400;
    alert.innerHTML = "Merci pour <br> votre inscription";

    // Create a new button for close the modal
    const button = document.createElement("button");
    button.className = "btn-submit";
    button.innerText = "Fermer"
    button.addEventListener("click", () => {
        modalbg.style.display = "none";
    })

    // Add the elements
    div.appendChild(alert);
    div.appendChild(button);
    modalBody.appendChild(div);
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