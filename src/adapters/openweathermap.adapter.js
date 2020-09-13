import axios from "axios"
import config from '../config/openweathermap.json'

export const getWeather = (cityName) => {
    return (
        axios.get(`${config.host}/weather?q=${cityName}&appid=${config.key}&units=metric`)
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