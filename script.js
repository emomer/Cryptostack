const menuButton = document.querySelector(".menu-button");
const xButton = document.querySelector(".close-sidebar");
const sidebar = document.querySelector(".sidebar");
const loginButton = document.querySelector(".login");
const reigsterButton = document.querySelector(".register");

menuButton.addEventListener("click", () => {
  sidebar.classList.add("sidebar-show");
  menuButton.style.display = "none";
  loginButton.style.display = "none";
  reigsterButton.style.display = "none";
});

xButton.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-show");
  menuButton.style.display = "block";
  loginButton.style.display = "block";
  reigsterButton.style.display = "block";
});

window.addEventListener("resize", () => {
  const containerDiv = document.querySelector(".navbar-container");
  if (window.innerWidth < 1064) {
    containerDiv.classList.remove("container"); // Klasse entfernen
  } else {
    containerDiv.classList.add("container"); // Klasse hinzufügen
    loginButton.style.display = "block";
    reigsterButton.style.display = "block";
  }
});

/* ---------- POPUP TABLE ----------- */

let popupTimeout;

function toggleFavorite(starElement) {
  const row = starElement.closest("tr");
  const coinName = row.querySelector(".coin-name").innerText.split(" ")[0];
  const popup = document.getElementById("popup");

  starElement.classList.toggle("active");

  const action = starElement.classList.contains("active")
    ? "hinzugefügt"
    : "entfernt";

  const word = starElement.classList.contains("active") ? "zu" : "aus";

  popup.innerText = `${coinName} wurde ${word} der Watchlist ${action}`;

  popup.classList.add("show");

  if (popupTimeout) {
    clearTimeout(popupTimeout); // Den laufenden Timeout stoppen
  }

  popupTimeout = setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

/* ------- COUNTER --------- */
const statElements = document.querySelectorAll(".number");

const startCounter = (statElement) => {
  statElement.innerHTML = "0";
  incrementStats(statElement);

  function incrementStats(statElement) {
    let currentNum = Number(statElement.innerHTML);
    const dataValue = statElement.getAttribute("data-value");
    const increment = dataValue / 100;

    const updateCounter = () => {
      currentNum = Math.min(currentNum + increment, dataValue);
      statElement.innerHTML = `${Math.floor(currentNum).toLocaleString()}+`;

      if (currentNum < dataValue) {
        setTimeout(updateCounter, 20);
      }
    };

    updateCounter();
  }
};

// Intersection Observer API
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statElement = entry.target;
      startCounter(statElement);
      observer.unobserve(statElement); // Stop observing once animation starts
    }
  });
});

// Observe each stat element
statElements.forEach((statElement) => {
  observer.observe(statElement);
});

/* -------- FAQ-Section ---------- */

const question = document.querySelectorAll(".question");
const arrow = document.querySelectorAll(".arrow");
const answer = document.querySelectorAll(".answer");

for (let i = 0; i < question.length; i++) {
  question[i].addEventListener("click", () => {
    answer[i].classList.toggle("a-opened");
    arrow[i].classList.toggle("arrow-rotated");
  });
}

/* -------- DROPDOWN-Sidebar ---------- */

const sidebarAccordion = document.querySelectorAll(".sidebar-accordion");

for (let i = 0; i < sidebarAccordion.length; i++) {
  sidebarAccordion[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  });
}
