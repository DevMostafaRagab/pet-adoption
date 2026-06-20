
// Fetching dynamic weather data and displays the current temperature into the first box
async function showWeather() {
  //* Defines a URL for the API
  const weatherURI = "https://api.weather.gov/gridpoints/MFL/110,50/forecast";
  // Initiates an API request
  const promiseResponse = await fetch(weatherURI);
  // Parses the response data
  const weatherData = await promiseResponse.json();
  // console.log(weatherData.properties.periods[0].temperature); // test and print temp to console
  // Extracts the temperature
  const currentTemp = weatherData.properties.periods[0].temperature;
  // Displays the temperature into the first box (Sunny Play)
  document.querySelector("#temp").textContent = currentTemp;
}

// call function
showWeather();