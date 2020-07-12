import React, { useEffect, useState } from 'react';
import { getWeather, getForecast } from '../adapters/openweathermap.adapter';
import Layout from './Layout';
import City from './City';
import { dayOfTheWeek } from '../helpers/dayOfWeek';

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

    // return only daily => 5 * 8 = 40 (and make object with keys: date, temperature and description)
    for (let index = 0; index < forecastData.forecast.length; index+=8) {
        let dateIndex = new Date(forecastData.forecast[index].dt_txt).getDay()
        dailyForecast.push({
            date: dayOfTheWeek[dateIndex],
            temperature: Math.round(forecastData.forecast[index].main.temp),
            description: forecastData.forecast[index].weather[0].main
        })
    }


    useEffect(() => {
        getWeather().then(response => {
            setData({
                name: response.data.name,
                weather: response.data.weather[0],
                main: response.data.main,
                wind: response.data.wind
            })
        });

        setBool(isOpened)
    }, [isOpened]);

    return (
        <Layout>
            <City data={weatherData} toggleButton={toggleButton} forecast={dailyForecast} isOpened={isOpened} />
        </Layout>
    )
}

export default App;