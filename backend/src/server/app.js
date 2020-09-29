const express = require('express');
const { findCities } = require('../helpers/cityService.helper');

const app = express();

app.get('', (req, res) => {
    res.send('Hello express!');
});

app.get(`/cities/:cityName`, (req, res) => {
    res.send(findCities(req.params.cityName));
});

app.listen(8080, () => {
    console.log('Server is up on port 8080');
});