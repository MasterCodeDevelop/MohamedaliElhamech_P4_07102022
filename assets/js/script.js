/**########################### CONST ###########################**/
/**######### DOM ELEMENTS #########**/
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

/**######### REGEX #########**/
const RegName = /^[a-zA-Z\- ]{2,20}$/i,
RegMail = /^[a-zA-Z0-9.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/i;

/**######### DATA #########**/
const dataTest = {
  firstName: {
    void: "Veuillez entrer votre prénom.",
    min: [2, "Veuillez entrer 2 caractères ou plus pour le champ du prénom."],
    max: [40, "Votre prénom doit avoir au maximum 40 caractères."],
    regex: [RegName, "Veuillez entrer un prénom correct."]
  },
  lastName: {
    void: "Veuillez entrer votre nom.",
    min: [2, "Veuillez entrer 2 caractères ou plus pour le champ du nom."],
    max: [40, "Votre nom doit avoir au maximum 40 caractères."],
    regex: [RegName, "Veuillez entrer un nom correct."]
  },
  email: {
    void: "Veuillez entrer votre adresse email",
    max: [100, "Votre email doit avoir au maximum 100 caractères."],
    regex: [RegMail, "Veuillez entrer un nom correct."]
  }
}

/**######### FUNCTIONS #########**/
// open the modal
openModal = () => {
  body.classList.add("scroll-hidden");
  modal.classList.add("is-open");
}
// close the modal
closeModal = () => {
  body.classList.remove("scroll-hidden");
  modal.classList.remove("is-open");
},
// reset all data in the form
resetForm = () => {
  closeModal();
  form.reset();
  document.querySelector('.message-sucess').remove();
  form.style.display = "flex";
  close.removeEventListener("click", resetForm);
  close.addEventListener("click", closeModal);
},
// verify the element if error display the error
verify = (e, dataTest) => {
  let { value, parentElement } = e,
  length = value.length - (value.split(" ").length-1),
  { min, max, regex } = dataTest;

  // All control test
  if (dataTest.void && length == 0) displayDataError(parentElement, dataTest.void);
  else if(min && length < min[0]) displayDataError(parentElement, min[1]);
  else if(min && length > max[0]) displayDataError(parentElement, max[1]);
  else if(regex && !regex[0].test(value)) displayDataError(parentElement, regex[1]);
  else return removeDataErrror(parentElement);
},
/**######### All controll valid form  #########**/
verifyFirstName = () => verify(firstName, dataTest.firstName),
verifyLastName = () => verify(lastName, dataTest.lastName),
verifyEmail = () => verify(email, dataTest.email),
verifyBirthDate = () => {
  let { value, parentElement } = birthDate,
  inputDate = new Date(value),
  today = new Date(),
  validDate = age => new Date(
    today.getFullYear()-age,
    today.getMonth(),
    today.getDate(),
    today.getHours(),
    today.getMinutes()
  ); 
  // min 3 years and max 100 years
  const min = validDate(3), max = validDate(100);

  if (value.length == 0) displayDataError(parentElement, "Vous devez entrer votre date de naissance.");
  else if (inputDate < max || inputDate > min ) displayDataError(parentElement, "Votre date de naissance est inccorect ! vous devez avoir entre 3 et 100 ans.");
  else return removeDataErrror(parentElement);
},
// Verify quantity
verifyQuantity = () => {
  let {value, parentElement} = quantity;

  if (value.length == 0) {
    displayDataError(parentElement, "Veuillez entrer le nombre de tournois où quel vous avez déja participé.")
  } else if (value < 0 || value > 99 || !Number.isInteger(parseFloat(value)) ) {
    displayDataError(parentElement, "Vous devez saisir un numbre correct entre 0 et 99 compris")
  } else return removeDataErrror(parentElement);
},
// radio checkBox
verifyCheckbox = () => {
  let checked = document.querySelectorAll(".radio-input[name='location']:checked").length;
  return verifyCheck(checked, eventLocation[0].parentElement, "Vous devez choisir une option.");
},
// verify condition
verifyCondition = () => {
  let { checked, parentElement } = condition;
  return verifyCheck(checked, parentElement, "Vous devez vérifier que vous acceptez les termes et conditions");
}

/**############### EventListener ###############**/
// launch/Display the mobile navbar
navbarToggler.addEventListener("click", () => {
  header.classList.toggle("is-open");
})

// launch modal event
btnSignup.forEach(btn => btn.addEventListener("click", openModal));
// closes the modal
close.addEventListener("click", closeModal)
// verify First Name
firstName.addEventListener("focusout", verifyFirstName);
// Verify last Name
lastName.addEventListener("focusout", verifyLastName);
// Verify Email
email.addEventListener("focusout", verifyEmail);
// Verify bith date
birthDate.addEventListener("focusout", verifyBirthDate);
// verify the number of tournaments already played
quantity.addEventListener("focusout", verifyQuantity);
// Verify checkBox of tournaments
for (const e of eventLocation) e.addEventListener("change", verifyCheckbox);
// verify the condition
condition.addEventListener("change", verifyCondition);
// if the submitted form
submit.addEventListener("click", e => submitForm(e))

/**########################### FUNCTION ###########################**/
function submitForm(e) {
  e.preventDefault();
  if( /*verifyFirstName() && verifyLastName() && verifyEmail() && verifyBirthDate() && verifyQuantity() && verifyCheckbox() && verifyCondition()*/ true ) {
    // create a new message of sucess
    const div = document.createElement("div");
    div.className = "message-sucess";
    form.style.display = "none";
    
    // create a new message of success
    const alert = document.createElement("h1");
    alert.style.fontWeight = 400;
    alert.innerHTML = "Merci pour <br> votre inscription";

    // Create a new button for close the modal
    const button = document.createElement("button");
    button.className = "btn btn-submit";
    button.innerText = "Fermer"
    button.addEventListener("click", resetForm);

    // Add the elements
    div.appendChild(alert);
    div.appendChild(button);
    modalBody.appendChild(div);

    // update buttons .close
    close.removeEventListener("click", closeModal);
    close.addEventListener("click", resetForm);
  }
}
// verify is chekced
function verifyCheck(checked, parentElement, errorMessage) {
  if (!checked) displayDataError(parentElement, errorMessage);
  else return removeDataErrror(parentElement);
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