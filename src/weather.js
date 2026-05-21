function processWeatherData(data) {
  return {
    city: data.current.city,
    country: data.current.country,
    temperature: Math.round(data.current.temperature.current),
    condition: data.current.condition.description,
    iconUrl: data.current.condition.icon_url,
    humidity: data.current.temperature.humidity,
    windSpeed: Math.round(data.current.wind.speed),
    forecast: data.forecast.slice(1, 6).map((day) => ({
      day: new Date(day.time * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      iconUrl: day.condition.icon_url,
      maxTemp: Math.round(day.temperature.maximum),
      minTemp: Math.round(day.temperature.minimum),
    })),
  };
}

export default processWeatherData;
