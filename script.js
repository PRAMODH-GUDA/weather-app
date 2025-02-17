const apiKey = '25f4d7e1160e7d181ce1748eb20f5d09';

async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    displayWeather(data);
}

function displayWeather(data) {
    if (typeof document !== 'undefined') {
        const weatherDiv = document.getElementById('weather-data');
        weatherDiv.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    }
}

function searchCity() {
    const city = document.getElementById('city-input').value;
    console.log('City input value:', city); // Debugging log
    getWeather(city);
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        getWeather('London'); // Default city
    });
}

// Export functions for testing
module.exports = { getWeather, displayWeather, searchCity };
