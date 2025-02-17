const assert = require('assert');
const sinon = require('sinon');
const { JSDOM } = require('jsdom');
const { getWeather, displayWeather, searchCity } = require('../script');

describe('Application Test Suite', function() {
    let dom;
    let window;
    let document;

    beforeEach(function() {
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Weather App</title>
            </head>
            <body>
                <input type="text" id="city-input" placeholder="Enter city name">
                <button id="search-button">Search</button>
                <div id="weather-data"></div>
            </body>
            </html>
        `);
        window = dom.window;
        document = window.document;
        global.window = window;
        global.document = document;

        document.getElementById('search-button').addEventListener('click', searchCity);
    });

    afterEach(function() {
        sinon.restore();
    });

    it('should fetch weather data for a city', async function() {
        const fetchStub = sinon.stub(global, 'fetch').resolves({
            json: () => Promise.resolve({ name: 'London', main: { temp: 280 }, weather: [{ description: 'clear sky' }] })
        });

        await getWeather('London');
        assert(fetchStub.calledOnce);
    });

    it('should display weather data', function() {
        document.body.innerHTML = `
            <div id="weather-data"></div>
        `;

        displayWeather({ name: 'London', main: { temp: 280 }, weather: [{ description: 'clear sky' }] });
        const weatherDiv = document.getElementById('weather-data');
        assert(weatherDiv.textContent.includes('London'));
    });
});
// Run the test with the command: npm test