import React, { useEffect, useState } from 'react';
import { getWeather } from '../adapters/openweathermap.adapter';
import Layout from './Layout';
import City from './City';

const App = () => {
    const weatherObject = {
        name: '',
        weather: [],
        main: [],
        wind: []
    };

    const [weatherData, setData] = useState(weatherObject);

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
            <City data={weatherData} />
        </Layout>
    )
}

export default App;