function updateBackground(condition) {
  const body = document.body;
  const weatherCondition = condition.toLowerCase();

  body.className = "";

  if (weatherCondition.includes("rain")) {
    body.classList.add("rainy");
  } else if (weatherCondition.includes("cloud")) {
    body.classList.add("cloudy");
  } else if (
    weatherCondition.includes("sun") ||
    weatherCondition.includes("clear")
  ) {
    body.classList.add("sunny");
  } else {
    body.classList.add("default-weather");
  }
}

function displayWeather(weather) {
  if (!weather) return;

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

  updateBackground(weather.condition);
}

export default displayWeather;
