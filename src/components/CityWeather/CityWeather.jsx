import React, { useState } from 'react';
import { useEffect } from 'react';
import { getForecast } from '../../adapters/openweathermap.adapter';
import './city.scss'
import getDirection from './getDirections.helper';

const CityWeather = ({ forecastCityName, weatherData }) => {

    const [forecastData, setForecastData] = useState([]);

    const [isForecastBoxOpen, setIsForecastBoxOpen] = useState(false);

    const toggleForecastBoxVisibility = () => {
        setIsForecastBoxOpen(!isForecastBoxOpen)
    }

    useEffect(() => {
        getForecast(forecastCityName).then(response => {
            var dailyForecast = [];
            // return only daily => 5 * 8 = 40 (and make object with keys: date, temperature and description)
            for (let index = 0; index < response.data.list.length; index += 8) {
                const forecastListData = response.data.list[index];
                const forecastDay = new Date(forecastListData.dt_txt);
                const forecastListMainDescription = forecastListData.weather[0].main ? forecastListData.weather[0].main : 'Description not available'

                dailyForecast.push({
                    date: forecastDay.toLocaleDateString('en', { weekday: 'long' }).slice(0, 3),
                    temperature: Math.round(forecastListData.main.temp),
                    description: forecastListMainDescription
                });
            }
            setForecastData(dailyForecast);
        })
    }, []);


    function dataDisplay() {
        const renderData = forecastData.map((forecastItem, index) => {
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