const express = require('express');
const cities = require('../static/json/cities.json');


const app = express();

const findCities = (cityName) => {
    // Counter for 5 cities
    let count = 0;

    // Convert first letter to uppercase
    const modifiedCityName = cityName[0].toUpperCase() + cityName.substring(1);

    // All matches should be saved inside citiesArray
    let citiesArray = []

    for (let index = 0; index < cities.length; index++) {
        if (cities[index].name.startsWith(modifiedCityName)) {
            count += 1;
            if (count === 5) {
                break;
            }
            citiesArray.push(cities[index].name);
        }
    }
    return citiesArray;
}

findCities('new')

app.get('', (req, res) => {
    res.send('Hello express!');
});

app.get(`/cities/:cityName`, (req, res) => {
    res.send(findCities(req.params.cityName));
})

app.listen(8080, () => {
    console.log('Server is up on port 8080');
});