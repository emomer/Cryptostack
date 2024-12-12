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

/* ---------- TABEL API ------------ */

const apiUrl = "https://api.coincap.io/v2/assets";
const tableBody = document.querySelector(".market-table tbody");

const charts = {}; // Globaler Speicher für alle Charts

// Fetch top cryptocurrencies
async function fetchCryptoData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error fetching cryptocurrency data");
    }
    const data = await response.json();
    const topCryptos = data.data.slice(0, 8); // Fetch top 8 cryptocurrencies
    updateTable(topCryptos);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

function updateTable(cryptos) {
  cryptos.forEach((crypto, index) => {
    // Check if the row for the current crypto already exists
    let row = document.querySelector(`#crypto-${crypto.id}`);
    if (!row) {
      // If not, create a new row
      row = document.createElement("tr");
      row.id = `crypto-${crypto.id}`;
      row.innerHTML = `
        <td data-cell="fav">
          <i class="fa fa-star favorite-icon" onclick="toggleFavorite(this)"></i>
        </td>
        <td class="hideunder768" data-cell="number">${index + 1}</td>
        <td data-name="name">
          <div class="wrapper">
            <img
              loading="lazy"
              src="https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png"
              alt="${crypto.name} logo"
              class="coin-logo"
            />
            <h4>
              <a href="#" class="coin-name">
                ${crypto.name} <span class="abk">${crypto.symbol}</span>
              </a>
            </h4>
          </div>
        </td>
        <td data-name="preis">$${parseFloat(crypto.priceUsd).toFixed(2)}</td>
        <td data-name="24hours" class="${getChangeColor(
          crypto.changePercent24Hr
        )}">
          ${parseFloat(crypto.changePercent24Hr) >= 0 ? "+" : ""}${parseFloat(
        crypto.changePercent24Hr
      ).toFixed(2)}%
        </td>
        <td class="hideUnder1063" data-name="marketcap">
          $${(parseFloat(crypto.marketCapUsd) / 1e9).toFixed(2)} B
        </td>
        <td data-name="7days" class="hideunder640">
          <canvas id="chart-${crypto.id}" class="charts"></canvas>
        </td>
        <td class="hideunder768" data-name="trade">
          <button class="trade-btn">Handeln</button>
        </td>
      `;
      tableBody.appendChild(row);
    } else {
      // Update the existing row with new data
      row.querySelector(`[data-name="preis"]`).textContent = `$${parseFloat(
        crypto.priceUsd
      ).toFixed(2)}`;

      row.querySelector(`[data-name="24hours"]`).textContent = `${
        parseFloat(crypto.changePercent24Hr) >= 0 ? "+" : ""
      }${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`;

      row.querySelector(`[data-name="24hours"]`).className = `${getChangeColor(
        crypto.changePercent24Hr
      )}`;

      row.querySelector(`[data-name="marketcap"]`).textContent = `$${(
        parseFloat(crypto.marketCapUsd) / 1e9
      ).toFixed(2)} B`;
    }

    // Fetch and update the price chart
    fetchPriceHistory(crypto.id).then((priceData) => {
      createOrUpdateChart(`chart-${crypto.id}`, priceData, crypto.id);
    });
  });
}

async function fetchPriceHistory(cryptoId) {
  const historyUrl = `https://api.coincap.io/v2/assets/${cryptoId}/history?interval=m5`;
  try {
    const response = await fetch(historyUrl);
    if (!response.ok)
      throw new Error(
        `Fehler beim Abrufen der Preisentwicklung für ${cryptoId}`
      );
    const data = await response.json();
    return data.data.map((point) => parseFloat(point.priceUsd).toFixed(2));
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

function createOrUpdateChart(chartId, priceData, cryptoId) {
  const canvas = document.getElementById(chartId);
  if (!canvas) {
    console.error(`Canvas für ${chartId} nicht gefunden.`);
    return;
  }

  const ctx = canvas.getContext("2d");

  // Konvertiere die Preisdaten in Zahlen, um korrekte Vergleiche zu gewährleisten
  const numericPriceData = priceData.map((price) => parseFloat(price));

  // Preisvergleich: erster und letzter Preis
  const firstPrice = numericPriceData[0];
  const lastPrice = numericPriceData[numericPriceData.length - 1];

  // Farben basierend auf Preisänderung
  const color =
    lastPrice >= firstPrice ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)";
  const backgroundColor =
    lastPrice >= firstPrice
      ? "rgba(75, 192, 192, 0.2)"
      : "rgba(255, 99, 132, 0.2)";

  // Grafik erstellen oder aktualisieren
  if (charts[cryptoId]) {
    // Aktualisiere bestehende Grafik
    charts[cryptoId].data.datasets[0].data = numericPriceData;
    charts[cryptoId].data.labels = numericPriceData.map(() => ""); // Leere Labels
    charts[cryptoId].data.datasets[0].borderColor = color; // Linienfarbe
    charts[cryptoId].data.datasets[0].backgroundColor = backgroundColor; // Hintergrundfarbe
    charts[cryptoId].update();
  } else {
    // Neue Grafik erstellen
    charts[cryptoId] = new Chart(ctx, {
      type: "line",
      data: {
        labels: numericPriceData.map(() => ""), // Leere Labels für minimalistische Darstellung
        datasets: [
          {
            data: numericPriceData,
            borderColor: color, // Dynamische Farbe
            backgroundColor: backgroundColor, // Dynamische Hintergrundfarbe
            fill: true,
            tension: 0.3,
            borderWidth: 1, // Dünnere Linie
            pointRadius: 0, // Punkte deaktivieren
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }, // Keine Legende anzeigen
        },
        scales: {
          x: { display: false }, // Keine X-Achse
          y: { display: false }, // Keine Y-Achse
        },
      },
    });
  }
}

// Determine the color class for the 24-hour change percentage
function getChangeColor(change) {
  return parseFloat(change) >= 0 ? "green" : "red";
}

// Fetch data every 30 seconds
fetchCryptoData();
setInterval(fetchCryptoData, 30000);
