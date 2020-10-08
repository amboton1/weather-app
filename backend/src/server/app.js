const express = require('express');
const { findCities } = require('../controllers/cityService');

const app = express();

app.get('', (req, res) => {
    res.send('Hello express!');
});

app.get(`/cities/:cityName`, (req, res) => {
    res.send(findCities(req.params.cityName));
});

app.get('*', (req, res) => {
    res.status(404);
});

app.listen(8080, () => {
    console.log('Server is up on port 8080');
});