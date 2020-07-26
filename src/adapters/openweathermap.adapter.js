import axios from "axios"
import config from '../config/openweathermap.json'

export const getWeather = () => {
    return (
        axios.get(`${config.host}/weather?q=${config.city}&appid=${config.key}&units=metric`)
    )
}

export const getForecast = () => {
    return (
        axios.get(`${config.host}/forecast?q=${config.city}&appid=${config.key}&units=metric`)
    )
}