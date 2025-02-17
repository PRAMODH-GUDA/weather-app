const assert = require('assert');
const sinon = require('sinon');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');
const script = require('../weather-app/script');

describe('Application Test Suite', () => {
    it('should return true for true', () => {
        assert.strictEqual(true, true);
    });
    
    it('should return 2 for 1 + 1', () => {
        assert.strictEqual(1 + 1, 2);
    });

    global.fetch = fetch;

    describe('Application Test Suite', () => {
        let window, document, getWeather, displayWeather, searchCity;

        beforeEach(() => {
            const dom = new JSDOM(`
                <!DOCTYPE html>
                <html>
                <body>
                    <div id="weather-data"></div>
                    <input id="city-input" />
                    <button id="search-button"></button>
                </body>
                </html>
            `);
            window = dom.window;
            document = window.document;
            global.document = document;

            getWeather = script.getWeather;
            displayWeather = script.displayWeather;
            searchCity = script.searchCity;
        });

        it('should return true for true', () => {
            assert.strictEqual(true, true);
        });
        
        it('should return 2 for 1 + 1', () => {
            assert.strictEqual(1 + 1, 2);
        });

        it('should fetch weather data for a city', async () => {
            const fakeResponse = {
                json: () => Promise.resolve({
                    name: 'London',
                    main: { temp: 280.32 },
                    weather: [{ description: 'clear sky' }]
                })
            };
            const fetchStub = sinon.stub(global, 'fetch').resolves(fakeResponse);

            await getWeather('London');
            assert(fetchStub.calledOnce);
            assert(fetchStub.calledWith('https://api.openweathermap.org/data/2.5/weather?q=London&appid=25f4d7e1160e7d181ce1748eb20f5d09'));

            fetchStub.restore();
        });

        it('should display weather data', () => {
            const data = {
                name: 'London',
                main: { temp: 280.32 },
                weather: [{ description: 'clear sky' }]
            };
            displayWeather(data);
            const weatherDiv = document.getElementById('weather-data');
            assert.strictEqual(weatherDiv.querySelector('h2').textContent, 'London');
            assert.strictEqual(weatherDiv.querySelector('p').textContent, 'Temperature: 7°C');
        });

        it('should call getWeather with the input city', () => {
            const getWeatherStub = sinon.stub();
            const cityInput = document.getElementById('city-input');
            cityInput.value = 'Paris';
            searchCity.call({ getWeather: getWeatherStub });
            assert(getWeatherStub.calledOnce);
            assert(getWeatherStub.calledWith('Paris'));
        });

        describe('Application Test Suite', () => {
            global.fetch = fetch;

            describe('Weather App Tests', () => {
                let window, document, getWeather, displayWeather, searchCity;

                beforeEach(() => {
                    const dom = new JSDOM(`
                        <!DOCTYPE html>
                        <html>
                        <body>
                            <div id="weather-data"></div>
                            <input id="city-input" />
                            <button id="search-button"></button>
                        </body>
                        </html>
                    `);
                    window = dom.window;
                    document = window.document;
                    global.document = document;

                    getWeather = script.getWeather;
                    displayWeather = script.displayWeather;
                    searchCity = script.searchCity;
                });

                it('should fetch weather data for a city', async () => {
                    const fakeResponse = {
                        json: () => Promise.resolve({
                            name: 'London',
                            main: { temp: 280.32 },
                            weather: [{ description: 'clear sky' }]
                        })
                    };
                    const fetchStub = sinon.stub(global, 'fetch').resolves(fakeResponse);

                    await getWeather('London');
                    assert(fetchStub.calledOnce);
                    assert(fetchStub.calledWith('https://api.openweathermap.org/data/2.5/weather?q=London&appid=25f4d7e1160e7d181ce1748eb20f5d09'));

                    fetchStub.restore();
                });

                it('should display weather data', () => {
                    const data = {
                        name: 'London',
                        main: { temp: 280.32 },
                        weather: [{ description: 'clear sky' }]
                    };
                    displayWeather(data);
                    const weatherDiv = document.getElementById('weather-data');
                    assert.strictEqual(weatherDiv.querySelector('h2').textContent, 'London');
                    assert.strictEqual(weatherDiv.querySelector('p').textContent, 'Temperature: 7°C');
                    assert.strictEqual(weatherDiv.querySelector('p:nth-of-type(2)').textContent, 'Weather: clear sky');
                });

                it('should call getWeather with the input city', () => {
                    const getWeatherStub = sinon.stub(script, 'getWeather');
                    const cityInput = document.getElementById('city-input');
                    cityInput.value = 'Paris';
                    searchCity();
                    assert(getWeatherStub.calledOnce);
                    assert(getWeatherStub.calledWith('Paris'));
                    getWeatherStub.restore();
                });

                it('should add event listener to search button', () => {
                    const searchButton = document.getElementById('search-button');
                    const addEventListenerSpy = sinon.spy(searchButton, 'addEventListener');
                    script.getWeather();
                    assert(addEventListenerSpy.calledOnce);
                    assert(addEventListenerSpy.calledWith('click', searchCity));
                });
            });
        });
    });
});