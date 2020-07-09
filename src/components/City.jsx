import React from 'react';
import '../scss/city.scss'

const City = (props) => {
    return (
        <div>
            <header>
                <h1>Weather App</h1>
            </header>
            <div className="container">
                <div className="content">
                    <div className="location">
                        <div className="name">
                            <span>
                                {props.data.name},
                                {props.data.weather.description}
                            </span>
                        </div>
                        <div className="icon">
                            <img
                                src={`http://openweathermap.org/img/wn/${props.data.weather.icon}.png`}
                                alt="weather icon"
                            />
                        </div>
                    </div>
                    <div className="weather__data">
                        <div className="temperature">
                            <span>
                                {Math.floor(props.data.main.temp)}&#176;
                            </span>
                        </div>
                        <div className="temperature__details">
                            <span>Feels like: {props.data.main.feels_like}&#176;</span>
                            <span>Pressure: {props.data.main.pressure} hPa</span>
                            <span>Humidity: {props.data.main.humidity}%</span>
                            <span>Wind: {Math.round(props.data.wind.speed)}km/h, NE</span>
                        </div>
                    </div>
                    <button className="show-hide-button" onClick={props.toggleButton}>
                            {props.toggleButton ? '-' : '+'}
                    </button>
                    <div className="forecast">
                        {props.isOpened && (
                            <div className="forecast__content">
                                <span>5 Day forecast</span>
                                <div className="forecast-days">
                                    test
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default City;