const getDirection = require("./getDirections.helper");

test('Returns direction of wind - 0', () => {
    expect(getDirection(0)).toBe('N');
});

test('Returns direction of wind - 45', () => {
    expect(getDirection(45)).toBe('NE');
});

test('Returns direction of wind - 90', () => {
    expect(getDirection(90)).toBe('E');
});