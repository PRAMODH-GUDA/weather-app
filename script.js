const apiKey = '25f4d7e1160e7d181ce1748eb20f5d09';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(city = 'London') {
    const apiUrl = `${baseUrl}?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeather(data);
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather-data');
    weatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

getWeather();

function searchCity() {
    const city = document.getElementById('city-input').value;
    getWeather(city);
}

document.getElementById('search-button').addEventListener('click', searchCity);

// Initial weather data for London
getWeather();
