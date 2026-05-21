import getWeatherData from "./api.js";
import processWeatherData from "./weather.js";
import displayWeather from "./dom.js";

const searchForm = document.querySelector(".search-form");
const cityInput = document.querySelector("#city-input");
const loadingElement = document.querySelector(".loading");
const errorMessage = document.querySelector(".error-message");
const unitButtons = document.querySelectorAll(".unit-btn");

let currentWeather = null;
let currentUnit = "celsius";

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
  } catch (error) {
    errorMessage.classList.remove("hidden");
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

loadWeather("Johannesburg");
