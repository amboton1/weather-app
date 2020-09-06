import axios from "axios"
import config from '../config/openweathermap.json'

export const getWeather = (cityName) => {
    return (
        axios.get(`${config.host}/weather?q=${cityName}&appid=${config.key}&units=metric`)
    )
}

export const getForecast = (cityName) => {
    return (
        axios.get(`${config.host}/forecast?q=${cityName}&appid=${config.key}&units=metric`)
    )
}