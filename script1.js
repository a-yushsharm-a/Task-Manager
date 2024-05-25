const quotes = [
    '"Time is what we want most, but what we use worst." - William Penn',
    '"The key is in not spending time, but in investing it." - Stephen R. Covey',
    '"Time is a created thing. To say "I don\'t have time" is like saying, "I don\'t want to." - Lao Tzu',
    '"The bad news is time flies. The good news is you\'re the pilot." - Michael Altshuler',
    '"Time isn\'t the main thing, it\'s the only thing." - Miles Davis'
];

let currentIndex = 0;

const quoteDisplay = document.getElementById('quote-display');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// Function to update the quote display
const updateQuote = (index) => {
    quoteDisplay.textContent = quotes[index];
}

// Event listeners for arrow clicks
leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : quotes.length - 1;
    updateQuote(currentIndex);
});

rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex < quotes.length - 1) ? currentIndex + 1 : 0;
    updateQuote(currentIndex);
});

// Auto-change quotes every 5 seconds
const autoChangeQuotes = () => {
    currentIndex = (currentIndex < quotes.length - 1) ? currentIndex + 1 : 0;
    updateQuote(currentIndex);
}

// Set initial quote
updateQuote(currentIndex);

// Start the interval for auto-changing quotes
setInterval(autoChangeQuotes, 3000);





// script.js
const daysContainer = document.querySelector(".days"),
    nextMonthBtn = document.querySelector(".next-month-btn"),
    prevMonthBtn = document.querySelector(".prev-month-btn"),
    nextYearBtn = document.querySelector(".next-year-btn"),
    prevYearBtn = document.querySelector(".prev-year-btn"),
    monthElement = document.querySelector(".month"),
    yearElement = document.querySelector(".year");

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Get current date
const date = new Date();

// Get current month and year
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

// Function to render calendar
function renderCalendar() {
    // Set first day of the month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;

    // Update current year and month in header
    monthElement.innerHTML = `${months[currentMonth]}`;
    yearElement.innerHTML = `${currentYear}`;

    // Update days html
    let daysHtml = "";

    // Prev month days
    for (let x = firstDay.getDay(); x > 0; x--) {
        daysHtml += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
    }

    // Current month days
    for (let i = 1; i <= lastDayDate; i++) {
        if (
            i === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()
        ) {
            daysHtml += `<div class="day today">${i}</div>`;
        } else {
            daysHtml += `<div class="day">${i}</div>`;
        }
    }

    // Next month days
    for (let j = 1; j <= nextDays; j++) {
        daysHtml += `<div class="day next">${j}</div>`;
    }

    // Update days container
    daysContainer.innerHTML = daysHtml;
}

renderCalendar();

// Event listeners for month navigation
nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

// Event listeners for year navigation
nextYearBtn.addEventListener("click", () => {
    currentYear++;
    renderCalendar();
});

prevYearBtn.addEventListener("click", () => {
    currentYear--;
    renderCalendar();
});

// lets hide today btn if its already current month and vice versa

function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}

function showTime() {
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    let session = "AM";

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = "pm";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;

    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;

    setTimeout(showTime, 1000);
}

showTime();







