function getDirection(degreeAngle) {
    const directions = ["N", "NE", "NE", "E", "E", "SE", "SE", "S", "S", "SW", "SW", "W", "W", "NW", "NW", "N"];
    const index = Math.floor((degreeAngle / 22.5));
    return directions[index];
}

module.exports = getDirection;