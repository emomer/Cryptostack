// Get references to the password toggle icon and the password input field
const togglePassword = document.getElementById("togglePassword"); // The eye icon used to toggle visibility
const passwordInput = document.getElementById("password"); // The password input field

// Add a click event listener to the eye icon
togglePassword.addEventListener("click", () => {
  // Check the current type of the password input field
  // If the type is "password", switch it to "text" to reveal the password
  // Otherwise, switch it back to "password" to obscure it
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);

  // Toggle the icon classes for the eye icon
  // If the password is visible, show the "fa-eye-slash" (closed eye) icon
  // If the password is hidden, show the "fa-eye" (open eye) icon
  togglePassword.classList.toggle("fa-eye");
  togglePassword.classList.toggle("fa-eye-slash");
});
