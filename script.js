const apiKey = '25f4d7e1160e7d181ce1748eb20f5d09';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=' + apiKey;

async function getWeather() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
}

getWeather();

async function getWeather() {
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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    getWeather(apiUrl);
}

async function getWeather(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeather(data);
}
