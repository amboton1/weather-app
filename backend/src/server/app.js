const express = require('express');
const fs = require('fs');
const readline = require('readline');
const { findCities } = require('../controllers/cityService');
const { readCities, readFile, fileExist, writeCity, createUserWeatherFile } = require('../controllers/fileService');

const app = express();
app.use(express.json());

app.get('', (req, res) => {
    res.send('Hello express!');
});

app.get(`/cities/:cityName`, (req, res) => {
    res.send(findCities(req.params.cityName));
});

app.post('/user-cities', (req, res) => {
    try {
        const fileName = req.body.user;
        const token = req.body.token;

        if (!fileExist(fileName)) {
            return res.status(404).send('User does not exist!');
        }

        const file = readFile(fileName);

        if (!file.includes(token)) {
            return res.status(403).send('User has no permission.');
        }

        res.json(readCities(file))
    } catch(err) {
        console.error(err);
    }
});

app.post('/user-cities/new-city', (req, res) => {
    try {
        const username = req.body.user;
        const token = req.body.token;
        const city = req.body.city;

        if (!fileExist(username)) {
            createUserWeatherFile(username, token, city);
            return;
        }

        const file = readFile(username);

        if (!file.includes(city)) {
            writeCity(username, city)
        } else {
            return;
        }
    } catch(err) {
        console.error(err)
    }
});

app.get('*', (req, res) => {
    res.status(404);
});

app.listen(8080, () => {
    console.log('Server is up on port 8080');
});