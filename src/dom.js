function displayWeather(weather) {
  const cityElement = document.querySelector(".city");
  const weatherIconElement = document.querySelector(".weather-icon");
  const temperatureElement = document.querySelector(".temperature");
  const conditionElement = document.querySelector(".condition");
  const detailsElement = document.querySelector(".details");

  cityElement.textContent = `${weather.city}, ${weather.country}`;
  weatherIconElement.src = weather.iconUrl;
  weatherIconElement.alt = weather.condition;
  temperatureElement.textContent = `${weather.temperature}${weather.unit}`;
  conditionElement.textContent = weather.condition;

  detailsElement.innerHTML = `
    <p>Humidity: ${weather.humidity}%</p>
    <p>Wind: ${weather.windSpeed} km/h</p>
  `;
}

export default displayWeather;
