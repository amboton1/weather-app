const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send('Hello express!');
});

app.get('/cities', (req, res) => {
    res.send('Cities page!');
})

app.listen(8080, () => {
    console.log('Server is up on port 8080');
});