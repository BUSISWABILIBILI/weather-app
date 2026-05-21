const apiKey = "b2a5adcct04b33178913oc335f405433";

async function getWeatherData(city) {
  const currentUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  const [currentResponse, forecastResponse] = await Promise.all([
    fetch(currentUrl),
    fetch(forecastUrl),
  ]);

  if (!currentResponse.ok || !forecastResponse.ok) {
    throw new Error("City not found");
  }

  const currentData = await currentResponse.json();
  const forecastData = await forecastResponse.json();

  return {
    current: currentData,
    forecast: forecastData.daily,
  };
}

export default getWeatherData;
