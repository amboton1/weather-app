const fs = require('fs');

function fileExist(fileName) {
    return fs.existsSync(`${fileName}.txt`);
}

function readFile(fileName) {
    return fs.readFileSync(`${fileName}.txt`, 'utf8');
}

function readCities(file) {
    let onlyUserCities = [];
    file.split(/\n/).forEach((line, index) => {
        if (index !== 0) {
            onlyUserCities.push(line);
        }
        index += 1;
    })
    return onlyUserCities;
}

module.exports = { fileExist, readFile, readCities }