import React, { useState } from 'react';
import { useEffect } from 'react';
import { getForecast } from '../../adapters/openweathermap.adapter';
import './city.scss'
import getDirection from './getDirections.helper';

const CityWeather = ({ forecastCityName, weatherData }) => {

    const [forecastData, setForecastData] = useState([]);

    const [isForecastBoxOpen, setIsForecastBoxOpen] = useState(false);

    const toggleForecastBoxVisibility = () => setIsForecastBoxOpen(!isForecastBoxOpen)

    const renderWeatherDataIcon = () => {
        return (
            weatherData.icon ? (
                <img
                    src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
                    alt="weather icon"
                />
            ) : null
        )
    }

    useEffect(() => {
        getForecast(forecastCityName).then(dailyForecast => setForecastData(dailyForecast));
    }, []);

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
                            {renderWeatherDataIcon()}
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
                            <span>{`Wind: ${Math.round(weatherData.windSpeed)} km/h, ${getDirection(weatherData.windDegree)}`}</span>
                        </div>
                    </div>
                    <button className="show-hide-button" onClick={toggleForecastBoxVisibility}>
                        {isForecastBoxOpen ? '-' : '+'}
                    </button>
                    <div className="forecast">
                        {isForecastBoxOpen && (
                            <div className="forecast__content">
                                <span>5 Day forecast</span>
                                <div className="forecast__days">
                                    {
                                        forecastData.map((forecastItem, index) => {
                                            return (
                                                <div key={index}>
                                                    <span> {forecastItem.date} </span>
                                                    <span> {forecastItem.temperature}&#176; </span>
                                                    <span> {forecastItem.description} </span>
                                                </div>
                                            )
                                        })
                                    }
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