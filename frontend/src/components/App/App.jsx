import React, { useState } from 'react';
import { getCityFromInput, getWeather } from '../../adapters/openweathermap.adapter';
import { debounce } from 'lodash';
import Layout from '../Layout/Layout';
import CityWeather from '../CityWeather/CityWeather';

const App = () => {

    const [inputText, setInputText] = useState('');

    const [citiesWeatherData, setCitiesWeatherData] = useState([]);

    const onInputChange = debounce((text) => {
        setInputText(text);
        getCityFromInput(text);
    }, 500)

    const handleFormSubmit = (event) => {
        event.preventDefault();

        getWeather(inputText).then((weatherData) => {
            setCitiesWeatherData([...citiesWeatherData, weatherData]);

            setInputText('');
        })

    }

    return (
        <Layout>
            <div className="container">
                <form onSubmit={handleFormSubmit}>
                    <div className="input-field">
                        <input onChange={(e) => onInputChange(e.target.value)} type="text" id="city-name" placeholder="Search City" />
                    </div>
                </form>
                <main className="main-content">
                    {
                        citiesWeatherData.map((weather, index) => {
                            return (<CityWeather key={index} weatherData={weather} forecastCityName={weather.cityName} />)
                        })
                    }
                </main>
            </div>
        </Layout>
    )
}

export default App;