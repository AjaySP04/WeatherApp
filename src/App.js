import React, { useState } from 'react';

import fetchWeather from './api/fetchWeather';

import './App.css';

const App = () => {
    const [ query, setQuery ] = useState('');

    const [ weather, setWeather ] = useState({});

    const search = async (e) => {
        if (e.which === 13) {
            const data = await fetchWeather(query);
            setWeather(data);
            setQuery('');
        }
    };

    return (
        <div className="main-container">
            <label for="place">Place</label>
            <input 
                id="place"
                type="text"
                className="search"
                placeholder="Search your city here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />
            { weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{ weather.name }</span>
                        <sup>{ weather.sys.country }</sup>
                    </h2>
                    <p>
                        Longitude: { weather.coord.lon }, 
                        Latitude: { weather.coord.lat }
                    </p>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <p>
                        Feels: { weather.main.feels_like}<sup>&deg;C ,  </sup>
                        Min: { weather.main.temp_min }<sup>&deg;C ,  </sup>
                        Max: { weather.main.temp_max }<sup>&deg;C</sup>
                    </p>
                    <div className="info">
                        <img 
                            className="city-icon"
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;