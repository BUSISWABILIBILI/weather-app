const apiKey = "b2a5adcct04b33178913oc335f405433";

async function getWeatherData(city) {
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export default getWeatherData;
