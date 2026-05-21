# Weather App

A responsive browser-based weather app that lets users search for a city and view current weather conditions plus a 5-day forecast.

## Features

- Search weather by city name
- Loads Johannesburg weather by default
- Shows current temperature, condition, humidity, and wind speed
- Displays a 5-day forecast
- Toggle temperatures between Celsius and Fahrenheit
- Updates the page background for sunny, cloudy, rainy, and default conditions
- Responsive layout for desktop and mobile screens

## Tech Stack

- HTML
- CSS
- JavaScript ES modules
- SheCodes Weather API

## Project Structure

```text
weather-app/
|-- index.html
|-- package.json
|-- server.js
|-- styles.css
|-- src/
|   |-- api.js
|   |-- dom.js
|   |-- index.js
|   `-- weather.js
|-- LICENSE
`-- README.md
```

## Getting Started

Clone the repository and open the project folder:

```bash
git clone <repository-url>
cd weather-app
```

Because the app uses JavaScript modules, run it through a local server instead of opening `index.html` directly.

Start the local development server:

```bash
npm run start
```

Then open:

```text
http://localhost:3000
```

If port `3000` is already in use, the server automatically tries the next available port. Use the URL printed in the terminal.

To require a specific port, set the `PORT` environment variable before starting the server.

## API Key

The app currently uses the SheCodes Weather API key defined in:

```text
src/api.js
```

To use your own key, replace the `apiKey` value in that file.

## How It Works

1. `src/index.js` listens for city searches and unit toggle clicks.
2. `src/api.js` fetches current weather and forecast data from the SheCodes Weather API.
3. `src/weather.js` formats the raw API response for display.
4. `src/dom.js` renders the weather card, forecast, and condition-based background.

## License

This project is licensed under the terms in the `LICENSE` file.
