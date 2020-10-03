const cities = require('../static/json/cities.json');

function findCities(inputCityName) {
    let cityCounter = 0;

    let citiesArray = [];

    for (let index = 0; index < cities.length; index++) {
        let lowerCaseCityName = cities[index].name.toLowerCase();
        inputCityName = inputCityName.toLowerCase();

        if (lowerCaseCityName.startsWith(inputCityName)) {
            cityCounter += 1;
            if (cityCounter === 6) {
                break;
            }
            citiesArray.push(lowerCaseCityName);
        }
    }
    return citiesArray;
}

module.exports = { findCities }