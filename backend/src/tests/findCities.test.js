const { findCities, filteredCities } = require("../controllers/cityService.controller");

test('Return array of strings for input "san"', () => {
    expect(findCities('san')).toEqual([
        "sant julià de lòria",
        "sangīn",
        "sang-e māshah",
        "sang-e chārak"
    ]);
});

test('Return array of strings for input "new"', () => {
    expect(findCities('new')).toEqual([
        "newman",
        "newtown",
        "newstead",
        "newport",
    ])
});

test('Should throw an error if called without an argument or if you pass something other than string', () => {
    expect(() => {
        findCities();
    }).toThrow(TypeError);
})

test('Return array of strings for input "san" - FILTERED CITIES FUNCTION', () => {
    expect(filteredCities('san')).toEqual([
        "sant julià de lòria",
        "sangīn",
        "sang-e māshah",
        "sang-e chārak",
        "sang atesh"
    ]);
});

test('Return array of strings for input "new" - FILTERED CITIES FUNCTION', () => {
    expect(filteredCities('new')).toEqual([
        "newman",
        "newtown",
        "newstead",
        "newport",
        "newport"
    ])
});

test('Should throw an error if called without an argument or if you pass something other than string - FILTERED CITIES FUNCTION', () => {
    expect(() => {
        filteredCities();
    }).toThrow(TypeError);
})