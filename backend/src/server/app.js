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
        const { user, token } = req.body;

        if (!fileExist(user)) {
            return res.status(404).send('User does not exist!');
        }

        const file = readFile(user);

        if (token === '') {
            return res.status(404).send('Token is empty!');
        }

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
        const { user, token, city } = req.body;

        if (!fileExist(user)) {
            createUserWeatherFile(user, token, city);
            return;
        }

        const file = readFile(user);

        if (!file.includes(city)) {
            writeCity(user, city);
            res.send(201);
        } else {
            res.send(422);
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