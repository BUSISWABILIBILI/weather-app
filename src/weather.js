function processWeatherData(data) {
  return {
    city: data.city,
    country: data.country,
    temperature: Math.round(data.temperature.current),
    condition: data.condition.description,
    iconUrl: data.condition.icon_url,
    humidity: data.temperature.humidity,
    windSpeed: Math.round(data.wind.speed),
  };
}

export default processWeatherData;
