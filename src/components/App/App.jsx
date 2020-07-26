import React, { useEffect, useState } from 'react';
import { getWeather, getForecast } from '../../adapters/openweathermap.adapter';
import Layout from '../Layout/Layout';
import CityWeather from '../CityWeather/CityWeather';

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
            const responseData = response.data;

            setWeatherData({
                cityName: responseData.name,
                weatherDescription: responseData.weather[0].description,
                icon: responseData.weather[0].icon,
                temp: responseData.main.temp,
                feels_like: responseData.main.feels_like,
                pressure: responseData.main.pressure,
                humidity: responseData.main.humidity,
                windSpeed: responseData.wind.speed
            }, {})
        });

        getForecast().then(response => {
            // return only daily => 5 * 8 = 40 (and make object with keys: date, temperature and description)
            for (let index = 0; index < response.data.list.length; index += 8) {
                const forecastListData = response.data.list[index];

                dailyForecast.push({
                    date: Date(forecastListData.dt_txt).slice(0, 3),
                    temperature: Math.round(forecastListData.main.temp),
                    description: forecastListData.weather[0].main
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