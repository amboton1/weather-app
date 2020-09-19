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

test('Returns direction of wind - 359', () => {
    expect(getDirection(359)).toBe('N');
});

test('Returns direction of wind - 200', () => {
    expect(getDirection(200)).toBe('S');
});