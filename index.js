const axios = require('axios');
const readlineSync = require('readline-sync');

const apiKey = 'd748989c4ccb81b1e4e4d0da6d40976f';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

const getWeather = async (city) => {
    try {
        const response = await axios.get(baseUrl, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        if(error.response) {
            console.log('Error: ', error.response.data.message);
        } else {
            console.log('Error: ', error.message);
        }
        return null;
    }
};

const displayWeather = (data) => {
    if (data) {
        console.log(`\nWeather in ${data.name}, ${data.sys.country}:`);
        console.log(`Temperature: ${data.main.temp}°C`);
        console.log(`Weather: ${data.weather[0].description}`);
        console.log(`Humidity: ${data.main.humidity}%`);
        console.log(`Wind Speed: ${data.wind.speed} m/s\n`);
    }
};

const showMenu = () => {
    console.log(`\n1. Get Weather`);
    console.log(`2. Exit`);
};

const main = async () => {
    let running = true;

    while(running) {
        const choice = readlineSync.question('Enter an option: ');

        switch(choice) {
            case '1':
                const city = readlineSync.question('Enter city name: ');
                const weatherData = await getWeather(city);
                displayWeather(weatherData);
                break;
            case '2':
                running = false;
                console.log('Good Bye!');
                break;
            default:
                console.log('Invalid option, enter an option 1 or 2.');
        }
    }
};

main();