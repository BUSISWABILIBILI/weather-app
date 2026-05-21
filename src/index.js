import getWeatherData from "./api.js";
import processWeatherData from "./weather.js";
import displayWeather from "./dom.js";

const searchForm = document.querySelector(".search-form");
const cityInput = document.querySelector("#city-input");
const loadingElement = document.querySelector(".loading");
const errorMessage = document.querySelector(".error-message");
const weatherContainer = document.querySelector(".weather-container");
const unitButtons = document.querySelectorAll(".unit-btn");
const themeToggle = document.querySelector(".theme-toggle");

let currentWeather = null;
let currentUnit = "celsius";
let currentTheme = localStorage.getItem("weather-theme") || "light";

function applyTheme(theme) {
  const isDarkMode = theme === "dark";

  document.body.classList.toggle("dark-mode", isDarkMode);
  themeToggle.setAttribute(
    "aria-label",
    isDarkMode ? "Switch to light mode" : "Switch to dark mode",
  );
}

function convertToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function getWeatherForDisplay() {
  if (!currentWeather) return null;

  if (currentUnit === "fahrenheit") {
    return {
      ...currentWeather,
      temperature: convertToFahrenheit(currentWeather.temperature),
      forecast: currentWeather.forecast.map((day) => ({
        ...day,
        maxTemp: convertToFahrenheit(day.maxTemp),
        minTemp: convertToFahrenheit(day.minTemp),
      })),
      unit: "\u00b0F",
    };
  }

  return {
    ...currentWeather,
    unit: "\u00b0C",
  };
}

async function loadWeather(city) {
  loadingElement.classList.remove("hidden");
  errorMessage.classList.add("hidden");

  try {
    const weatherData = await getWeatherData(city);
    currentWeather = processWeatherData(weatherData);

    displayWeather(getWeatherForDisplay());
    weatherContainer.classList.remove("hidden");
  } catch (error) {
    errorMessage.classList.remove("hidden");
    if (!currentWeather) {
      weatherContainer.classList.add("hidden");
    }
  } finally {
    loadingElement.classList.add("hidden");
  }
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") return;

  await loadWeather(city);

  cityInput.value = "";
});

unitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentUnit = button.dataset.unit;

    unitButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    displayWeather(getWeatherForDisplay());
  });
});

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("weather-theme", currentTheme);
  applyTheme(currentTheme);
});

applyTheme(currentTheme);
loadWeather("Johannesburg");
