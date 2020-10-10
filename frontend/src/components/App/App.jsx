import React, { useState } from 'react';
import { getCityFromInput, getWeather } from '../../adapters/openweathermap.adapter';
import { debounce } from 'lodash';
import Layout from '../Layout/Layout';
import CityWeather from '../CityWeather/CityWeather';
const bcrypt = require('bcryptjs')

const App = () => {

    const [inputText, setInputText] = useState('');

    const [citiesWeatherData, setCitiesWeatherData] = useState([]);

    const [filteredDropdownList, setFilteredDropdownList] = useState([]);

    const [userInput, setUserInput] = useState({});

    const onInputChange = debounce((text) => {
        setInputText(text);
        getCityFromInput(text).then((autocompleteDropdownCities) => setFilteredDropdownList(autocompleteDropdownCities));
    }, 500)

    const renderAutocompleteList = () => filteredDropdownList.map((item, index) => <option key={index} value={item} />)

    const handleFormSubmit = (event) => {
        event.preventDefault();

        getWeather(inputText).then((weatherData) => {
            setCitiesWeatherData([...citiesWeatherData, weatherData]);
            setInputText('');
        })
    }

    const onUserInputChange = (e) => setUserInput(e.target.value);

    const handleUserSubmit = async (event) => {
        event.preventDefault();
        const token = await bcrypt.hash(userInput, 8);

        localStorage.setItem('user', userInput);
        localStorage.setItem('token', token);
    }

    return (
        <Layout>
            <div className="container">
                <form onSubmit={handleUserSubmit}>
                    <div className="user-input-field">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            onChange={onUserInputChange}
                        />
                    </div>
                </form>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-field">
                        <input
                            autoComplete="off"
                            list="cities"
                            onChange={(e) => onInputChange(e.target.value)}
                            type="text"
                            id="city-name"
                            placeholder="Search City"
                        />
                        <datalist id="cities">
                            {renderAutocompleteList()}
                        </datalist>
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