import React, { useEffect, useState } from 'react';
import { getWeather, getForecast } from '../adapters/openweathermap.adapter';
import Layout from './Layout';
import CityWeather from './CityWeather';

const App = () => {

    let dailyForecast = [];

    const [forecastData, setForecastData] = useState({});

    const [weatherData, setWeatherData] = useState({});

    const [isForecastBoxOpen, setIsForecastBoxOpen] = useState(false)

    const toggleForecastBoxVisibility = () => {
        setIsForecastBoxOpen(!isForecastBoxOpen)
    }

    useEffect(() => {
        getWeather().then(response => {
            setWeatherData({
                cityName: response.data.name,
                weatherDescription: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
                temp: response.data.main.temp,
                feels_like: response.data.main.feels_like,
                pressure: response.data.main.pressure,
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed
            }, {})
        });

        getForecast().then(response => {
            // return only daily => 5 * 8 = 40 (and make object with keys: date, temperature and description)
            for (let index = 0; index < response.data.list.length; index += 8) {
                const forecast = response.data.list[index];
                dailyForecast.push({
                    date: Date(forecast.dt_txt).slice(0, 3),
                    temperature: Math.round(response.data.list[index].main.temp),
                    description: response.data.list[index].weather[0].main
                })
            }

            setForecastData(dailyForecast)
        })

    }, []);

    return (
        <Layout>
            <CityWeather weatherData={weatherData} onButtonToggle={toggleForecastBoxVisibility} forecast={forecastData} isForecastBoxOpen={isForecastBoxOpen} />
        </Layout>
    )
}

export default App;