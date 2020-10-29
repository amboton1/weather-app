import React, { useState, useEffect } from 'react';
import { displayUserCities, getCityFromInput, getWeather, submitNewUserCity } from '../../adapters/openweathermap.adapter';
import { debounce } from 'lodash';
import Layout from '../Layout/Layout';
import CityWeather from '../CityWeather/CityWeather';
import UserInput from './../UserInput';
const bcrypt = require('bcryptjs')

const App = () => {

    const [inputText, setInputText] = useState('');

    const [citiesWeatherData, setCitiesWeatherData] = useState([]);

    const [filteredDropdownList, setFilteredDropdownList] = useState([]);

    const [userInput, setUserInput] = useState({});

    const [showingUserInput, isShowingUserInput] = useState(false);

    const onInputChange = debounce((text) => {
        setInputText(text);
        getCityFromInput(text).then((autocompleteDropdownCities) => setFilteredDropdownList(autocompleteDropdownCities));
    }, 500)

    const renderAutocompleteList = () => filteredDropdownList.map((item, index) => <option key={index} value={item} />)

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        submitNewUserCity(user, token, inputText);

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

    useEffect(() => {
        const existingUser = localStorage.getItem('user');
        const getUserToken = localStorage.getItem('token');

        if (existingUser) {
            isShowingUserInput(true);

            displayUserCities(existingUser, getUserToken).then((userCitiesList) => {
                if(!userCitiesList) return;
                const userCitiesPromises = userCitiesList.map(city => {
                    const cityWithoutCountry = city.split(',')[0];
                    return getWeather(cityWithoutCountry);
                });

                Promise.all(userCitiesPromises).then(results => {
                    setCitiesWeatherData(citiesWeatherData.concat(results));
                })
            })
        }
    }, [])

    return (
        <Layout>
            <div className="container">
                {!showingUserInput && (
                        <UserInput
                            handleUserSubmit={handleUserSubmit}
                            onUserInputChange={onUserInputChange}
                        />
                    )
                }
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