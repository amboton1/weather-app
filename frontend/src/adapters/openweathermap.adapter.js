import axios from "axios"
import config from '../config/openweathermap.json'

export const getWeather = (cityName) => {
    return (
        axios.get(`${config.host}/weather?q=${cityName}&appid=${config.key}&units=metric`).then(response => {
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
            return weatherData;
        })
    )
}

export const getForecast = (cityName) => {
    return (
        axios.get(`${config.host}/forecast?q=${cityName}&appid=${config.key}&units=metric`).then(response => {
            var dailyForecast = [];
            // return only daily => 5 * 8 = 40 (and make object with keys: date, temperature and description)
            for (let index = 0; index < response.data.list.length; index += 8) {
                const forecastListData = response.data.list[index];
                const forecastDay = new Date(forecastListData.dt_txt);
                const forecastListMainDescription = forecastListData.weather[0].main ? forecastListData.weather[0].main : 'Description not available'

                dailyForecast.push({
                    date: forecastDay.toLocaleDateString('en', { weekday: 'long' }).slice(0, 3),
                    temperature: Math.round(forecastListData.main.temp),
                    description: forecastListMainDescription
                });
            }
            return dailyForecast;
        })
    )
}

export const getCityFromInput = (cityName) => {
    return (
        axios.get(`/cities/${cityName}`).then(response => {
            const autocompleteDropdownCities = response.data;
            return autocompleteDropdownCities;
        })
    )
}

export const submitNewUserCity = (user, token, city) => {
    return (
        axios.post('/user-cities/new-city', { user: user, token: token, city: city })
            .then(res => {
                const userInformations = res.data;
                return userInformations;
            })
            .catch(error => {
                console.log(error)
            })
    )
}

export const getUserCities = (user, token) => {
    return (
        axios.post('/user-cities', { user: user, token: token }).then(res => {
            const userCitiesList = res.data;
            return userCitiesList;
        }).catch(error => {
            console.log(error);
        })
    )
}