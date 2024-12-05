// Selecting DOM elements for sidebar and buttons
const menuButton = document.querySelector(".menu-button"); // Button to open the sidebar
const xButton = document.querySelector(".close-sidebar"); // Button to close the sidebar
const sidebar = document.querySelector(".sidebar"); // Sidebar element
const loginButton = document.querySelector(".login"); // Login button
const registerButton = document.querySelector(".register");

// Event listener to show the sidebar when the menu button is clicked
menuButton.addEventListener("click", () => {
  sidebar.classList.add("show"); // Add class to display the sidebar
  menuButton.classList.add("hidden");
  loginButton.classList.add("hidden");
  registerButton.classList.add("hidden");
});

// Event listener to hide the sidebar when the close button is clicked
xButton.addEventListener("click", () => {
  sidebar.classList.remove("show"); // Remove class to hide the sidebar
  menuButton.classList.remove("hidden");
  loginButton.classList.remove("hidden");
  registerButton.classList.remove("hidden");
});

// Event listener to handle responsive design for navbar
window.addEventListener("resize", () => {
  const containerDiv = document.querySelector(".navbar-container"); // Navbar container
  if (window.innerWidth < 1064) {
    containerDiv.classList.remove("container"); // Remove container class for smaller screens
  } else {
    containerDiv.classList.add("container"); // Add container class for larger screens
    loginButton.classList.remove("hidden");
    registerButton.classList.remove("hidden");
  }
});

/* ---------- POPUP TABLE ----------- */

// Timeout ID for popup message
let popupTimeout;

// Function to toggle favorite status and display a popup message
function toggleFavorite(starElement) {
  const row = starElement.closest("tr"); // Get the table row containing the clicked star
  const coinName = row.querySelector(".coin-name").innerText.split(" ")[0]; // Extract coin name
  const popup = document.getElementById("popup"); // Popup message element

  starElement.classList.toggle("active"); // Toggle active class on the star

  // Determine the action (add/remove) and wording for the popup
  const action = starElement.classList.contains("active")
    ? "hinzugefügt"
    : "entfernt";
  const word = starElement.classList.contains("active") ? "zu" : "aus";

  // Update the popup message and display it
  popup.innerText = `${coinName} wurde ${word} der Watchlist ${action}`;
  popup.classList.add("show");

  // Clear any existing timeout and set a new one to hide the popup
  if (popupTimeout) {
    clearTimeout(popupTimeout);
  }
  popupTimeout = setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

/* ------- COUNTER --------- */

// Select all elements with the class "number" and store them in a NodeList
const statElements = document.querySelectorAll(".number");

// Function to start the counter animation for a given element
const startCounter = (element) => {
  element.textContent = "0"; // Initialize the element's content to "0"
  let current = 0; // Variable to keep track of the current counter value
  const target = +element.getAttribute("data-value"); // Get the target value from the element's "data-value" attribute and convert it to a number
  const increment = target / 100; // Calculate the increment step (target divided into 100 steps)

  // Function to update the counter value repeatedly until it reaches the target
  const updateCounter = () => {
    current = Math.min(current + increment, target); // Increase the current value but ensure it does not exceed the target
    element.textContent = `${Math.floor(current).toLocaleString()}+`; // Update the element's content with the current value, formatted with thousands separators
    if (current < target) {
      setTimeout(updateCounter, 20); // Schedule the next update after 20 milliseconds if the target has not been reached
    }
  };

  updateCounter(); // Start the counter animation
};

// Create a new IntersectionObserver to monitor when elements become visible in the viewport
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(({ isIntersecting, target }) => {
    // Iterate over the observed entries
    if (isIntersecting) {
      // Check if the element is visible in the viewport
      startCounter(target); // Start the counter animation for the visible element
      observer.unobserve(target); // Stop observing this element to prevent re-triggering the animation
    }
  });
});

// Attach the observer to each element in the NodeList to start monitoring them
statElements.forEach((statElement) => observer.observe(statElement));

/* -------- FAQ-Section ---------- */

// Selecting elements for FAQ functionality
const question = document.querySelectorAll(".question"); // FAQ question elements
const arrow = document.querySelectorAll(".arrow"); // Arrow icons
const answer = document.querySelectorAll(".answer"); // FAQ answer elements

// Add click event listeners to toggle FAQ answers and rotate arrows
for (let i = 0; i < question.length; i++) {
  question[i].addEventListener("click", () => {
    answer[i].classList.toggle("hidden"); // Toggle the visibility of the answer
    arrow[i].classList.toggle("arrow-rotated"); // Rotate the arrow icon
  });
}

/* -------- DROPDOWN-Sidebar ---------- */

// Selecting sidebar accordion items
const sidebarAccordion = document.querySelectorAll(".sidebar-accordion");

// Add click event listeners for dropdown functionality in the sidebar
for (let i = 0; i < sidebarAccordion.length; i++) {
  sidebarAccordion[i].addEventListener("click", function () {
    this.classList.toggle("active"); // Toggle the active class
    let panel = this.nextElementSibling; // Get the next sibling element (dropdown panel)
    if (panel.style.display === "flex") {
      panel.style.display = "none"; // Hide the panel if it's already visible
    } else {
      panel.style.display = "flex"; // Show the panel if it's hidden
    }
  });
}
