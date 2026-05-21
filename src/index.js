import getWeatherData from "./api.js";
import processWeatherData from "./weather.js";
import displayWeather from "./dom.js";

const searchForm = document.querySelector(".search-form");
const cityInput = document.querySelector("#city-input");
const loadingElement = document.querySelector(".loading");
const errorMessage = document.querySelector(".error-message");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") return;

  loadingElement.classList.remove("hidden");
  errorMessage.classList.add("hidden");

  try {
    const weatherData = await getWeatherData(city);
    const cleanWeatherData = processWeatherData(weatherData);

    displayWeather(cleanWeatherData);

    cityInput.value = "";
  } catch (error) {
    errorMessage.classList.remove("hidden");
  } finally {
    loadingElement.classList.add("hidden");
  }
});
