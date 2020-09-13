import React, { useState } from 'react';
import { getWeather } from '../../adapters/openweathermap.adapter';
import Layout from '../Layout/Layout';
import CityWeather from '../CityWeather/CityWeather';

const App = () => {

    const [inputText, setInputText] = useState('');

    const [citiesWeatherData, setCitiesWeatherData] = useState([]);

    const onInputChange = (event) => setInputText(event.target.value);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        getWeather(inputText).then(response => {
            const responseData = response.data;
            const responseDataWeather = responseData.weather[0] ? responseData.weather[0] : 'Data is currently not available';

            const weatherData = {
                cityName: responseData.name,
                weatherDescription: responseDataWeather.description,
                icon: responseDataWeather.icon,
                temp: responseData.main.temp,
                feels_like: responseData.main.feels_like,
                pressure: responseData.main.pressure,
                humidity: responseData.main.humidity,
                windSpeed: responseData.wind.speed,
                windDegree: responseData.wind.deg
            };

            setCitiesWeatherData([...citiesWeatherData, weatherData]);

            setInputText('');
        });

    }

    return (
        <Layout>
            <form onSubmit={handleFormSubmit}>
                <div className="input-field">
                    <input onChange={onInputChange} value={inputText} type="text" id="city-name" placeholder="Search City" />
                </div>
            </form>
            {
                citiesWeatherData.map((weather, index) => {
                    return (<CityWeather key={index} weatherData={weather} forecastCityName={weather.cityName} />)
                })
            }
        </Layout>
    )
}

export default App;