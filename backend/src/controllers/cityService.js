const cities = require('../static/json/cities.json');

function findCities(inputCityName) {
    let cityCounter = 0;

    let citiesArray = [];

    for (let index = 0; index < cities.length; index++) {
        if (cities[index].name.startsWith(inputCityName)) {
            citiesArray.push(`${cities[index].name}, ${cities[index].country}`);
            cityCounter += 1;
            if (cityCounter === 5) {
                break;
            }
        }
    }
    return citiesArray;
}

module.exports = { findCities }