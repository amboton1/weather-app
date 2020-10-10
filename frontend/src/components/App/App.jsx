import React, { useState } from 'react';
import { getCityFromInput, getWeather } from '../../adapters/openweathermap.adapter';
import { debounce } from 'lodash';
import Layout from '../Layout/Layout';
import CityWeather from '../CityWeather/CityWeather';

const App = () => {

    const [inputText, setInputText] = useState('');

    const [citiesWeatherData, setCitiesWeatherData] = useState([]);

    const [filteredDropdownList, setFilteredDropdownList] = useState([])

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

    return (
        <Layout>
            <div className="container">
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