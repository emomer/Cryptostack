/* ------------ Country-Select ------------ */
// Get references to the "selected country" div and the dropdown items container
const selected = document.querySelector(".select-selected");
const items = document.querySelector(".select-items");

// Event listener to handle the click on the "selected country" dropdown
selected.addEventListener("click", function () {
  // Toggle the visibility of the dropdown items
  items.classList.toggle("active");
  // Highlight the "selected country" dropdown when active
  selected.classList.toggle("active");
});

// Event listener for selecting a specific country from the dropdown
items.addEventListener("click", function (e) {
  // Check if the clicked element is a country option (tagName = DIV)
  if (e.target.tagName === "DIV") {
    // Set the selected country's name in the dropdown
    selected.textContent = e.target.textContent;
    // Close the dropdown and remove the active state
    items.classList.remove("active");
    selected.classList.remove("active");
  }
});

// Event listener to close the dropdown when clicking outside of it
document.addEventListener("click", function (e) {
  // Close dropdown if the click is outside the dropdown or selected area
  if (!selected.contains(e.target) && !items.contains(e.target)) {
    items.classList.remove("active");
    selected.classList.remove("active");
  }
});

/* ------------ Password-Requirements --------------- */
// Get references to the password input field and the requirement indicators
var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var number = document.getElementById("number");
var specialChar = document.getElementById("special-char");
var lengthRequirement = document.getElementById("length");

// Add an event listener to the password field to validate as the user types
myInput.addEventListener("input", () => {
  // Regex for validating at least one letter (a-z or A-Z)
  const letters = /[a-zA-Z]/;
  if (myInput.value.match(letters)) {
    // Mark as valid and update the icon for "1 letter"
    letter.classList.remove("invalid");
    letter.classList.add("valid");
    letter.innerHTML = '<i class="fa-regular fa-circle-check"></i> 1 letter';
  } else {
    // Mark as invalid if the requirement isn't met
    letter.classList.remove("valid");
    letter.classList.add("invalid");
    letter.innerHTML = '<i class="fa-regular fa-circle-xmark"></i> 1 letter';
  }

  // Regex for validating at least one number (0-9)
  const numbers = /[0-9]/;
  if (myInput.value.match(numbers)) {
    // Mark as valid and update the icon for "1 number"
    number.classList.remove("invalid");
    number.classList.add("valid");
    number.innerHTML = '<i class="fa-regular fa-circle-check"></i> 1 number';
  } else {
    // Mark as invalid if the requirement isn't met
    number.classList.remove("valid");
    number.classList.add("invalid");
    number.innerHTML = '<i class="fa-regular fa-circle-xmark"></i> 1 number';
  }

  // Regex for validating at least one special character
  var specialChars = /[-_.+]/;
  if (myInput.value.match(specialChars)) {
    // Mark as valid and update the icon for "1 special character"
    specialChar.classList.remove("invalid");
    specialChar.classList.add("valid");
    specialChar.innerHTML =
      '<i class="fa-regular fa-circle-check"></i> 1 special character';
  } else {
    // Mark as invalid if the requirement isn't met
    specialChar.classList.remove("valid");
    specialChar.classList.add("invalid");
    specialChar.innerHTML =
      '<i class="fa-regular fa-circle-xmark"></i> 1 special character';
  }

  // Check if the password length is at least 12 characters
  if (myInput.value.length >= 12) {
    // Mark as valid and update the icon for "12 characters"
    lengthRequirement.classList.remove("invalid");
    lengthRequirement.classList.add("valid");
    lengthRequirement.innerHTML =
      '<i class="fa-regular fa-circle-check"></i> 12 characters';
  } else {
    // Mark as invalid if the requirement isn't met
    lengthRequirement.classList.remove("valid");
    lengthRequirement.classList.add("invalid");
    lengthRequirement.innerHTML =
      '<i class="fa-regular fa-circle-xmark"></i> 12 characters';
  }
});

/* ------------ Password-Eye --------------- */
// Get references to the password toggle icon and the password input field
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

// Add an event listener for toggling the password visibility
togglePassword.addEventListener("click", () => {
  // Check the current type of the password field and toggle between "text" and "password"
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle the eye icon classes for open and closed states
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});
