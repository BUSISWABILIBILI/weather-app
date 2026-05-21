function displayWeather(weather) {
  const cityElement = document.querySelector(".city");
  const temperatureElement = document.querySelector(".temperature");
  const conditionElement = document.querySelector(".condition");
  const detailsElement = document.querySelector(".details");

  cityElement.textContent = `${weather.city}, ${weather.country}`;
  temperatureElement.textContent = `${weather.temperature}°C`;
  conditionElement.textContent = weather.condition;

  detailsElement.innerHTML = `
    <p>Humidity: ${weather.humidity}%</p>
    <p>Wind: ${weather.windSpeed} km/h</p>
  `;
}

export default displayWeather;
