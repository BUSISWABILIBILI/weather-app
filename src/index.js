import getWeatherData from "./api.js";
import processWeatherData from "./weather.js";
import displayWeather from "./dom.js";

const searchForm = document.querySelector(".search-form");
const cityInput = document.querySelector("#city-input");
const loadingElement = document.querySelector(".loading");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") return;

  loadingElement.classList.remove("hidden");

  const weatherData = await getWeatherData(city);
  const cleanWeatherData = processWeatherData(weatherData);

  displayWeather(cleanWeatherData);

  loadingElement.classList.add("hidden");
  cityInput.value = "";
});
