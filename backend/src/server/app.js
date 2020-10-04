const express = require('express');
const { findCities, filteredCities } = require('../controllers/cityService.controller');

const app = express();

app.get('', (req, res) => {
    res.send('Hello express!');
});

app.get(`/cities/:cityName`, (req, res) => {
    res.send(filteredCities(req.params.cityName));
});

app.get('*', (req, res) => {
    res.status(404);
});

app.listen(8080, () => {
    console.log('Server is up on port 8080');
});