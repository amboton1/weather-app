import React, { useEffect, useState } from 'react';
import { getWeather, getForecast } from '../adapters/openweathermap.adapter';
import Layout from './Layout';
import City from './City';

const App = () => {
    const weatherObject = {
        name: '',
        weather: [],
        main: [],
        wind: []
    };

    const forecastObject = {
        forecast: []
    }

    let dailyForecast = [];

    const [forecastData, setForecast] = useState(forecastObject);

    const [weatherData, setData] = useState(weatherObject);

    const [isOpened, setBool] = useState(false)

    const toggleButton = () => {
        setBool(!isOpened)

        getForecast().then(response => {
            setForecast({
                forecast: response.data.list,
            })
        })
    }

    // return only daily => 5 * 8 = 40
    for (let index = 0; index < forecastData.forecast.length; index+=8) {
        dailyForecast.push(forecastData.forecast[index].weather[0], forecastData.forecast[index].main.temp, forecastData.forecast[index].dt_txt)
    }

    console.log(dailyForecast)

    useEffect(() => {
        getWeather().then(response => {
            setData({
                name: response.data.name,
                weather: response.data.weather[0],
                main: response.data.main,
                wind: response.data.wind
            })
        });
    }, []);

    return (
        <Layout>
            <City data={weatherData} toggleButton={toggleButton} forecast={dailyForecast} isOpened={isOpened} />
        </Layout>
    )
}

export default App;