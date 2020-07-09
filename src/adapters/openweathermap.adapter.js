import axios from "axios"
import city from '../config/openweathermap.json'

export const getWeather = () => {
    return (
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=${city.key}&units=metric`)
    )
}

export const getForecast = () => {
    return (
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city.city}&appid=${city.key}&units=metric`)
    )
}