import React from 'react';
import './city.scss'

const CityWeather = ({ forecast, weatherData, onButtonToggle, isForecastBoxOpen }) => {

    function getDirection(degreeAngle) {
        const directions = ["N", "NE", "NE", "E", "E", "SE", "SE", "S", "S", "SW", "SW", "W", "W", "NW", "NW", "N"];
        const index = Math.floor((degreeAngle / 22.5));
        console.log(directions[index]);
    }

    function dataDisplay() {
        const renderData = forecast.map((forecastItem, index) => {
            return (
                <div key={index}>
                    <span> {forecastItem.date} </span>
                    <span> {forecastItem.temperature}&#176; </span>
                    <span> {forecastItem.description} </span>
                </div>
            )
        })

        return renderData;
    }

    return (
        <div>
            <div className="container">
                <div className="content">
                    <div className="location">
                        <div className="name">
                            <span>
                                {weatherData.cityName},
                                {weatherData.weatherDescription}
                            </span>
                        </div>
                        <div className="icon">
                            {
                                weatherData.icon ? (
                                    <img
                                        src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
                                        alt="weather icon"
                                    />
                                ) : null
                            }
                        </div>
                    </div>
                    <div className="weather__data">
                        <div className="temperature">
                            <span>
                                {Math.floor(weatherData.temp)}&#176;
                            </span>
                        </div>
                        <div className="temperature__details">
                            <span>Feels like: {weatherData.feels_like}&#176;</span>
                            <span>Pressure: {weatherData.pressure} hPa</span>
                            <span>Humidity: {weatherData.humidity}%</span>
                            <span>{`Wind: ${Math.round(weatherData.windSpeed)} km/h, `}</span>
                        </div>
                    </div>
                    <button className="show-hide-button" onClick={onButtonToggle}>
                        {isForecastBoxOpen ? '-' : '+'}
                    </button>
                    <div className="forecast">
                        {isForecastBoxOpen && (
                            <div className="forecast__content">
                                <span>5 Day forecast</span>
                                <div className="forecast__days">
                                    {dataDisplay()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CityWeather;