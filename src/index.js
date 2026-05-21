import getWeatherData from "./api.js";
import processWeatherData from "./weather.js";

const searchForm = document.querySelector(".search-form");
const cityInput = document.querySelector("#city-input");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") return;

  const weatherData = await getWeatherData(city);
  const cleanWeatherData = processWeatherData(weatherData);

  console.log(cleanWeatherData);

  cityInput.value = "";
});
