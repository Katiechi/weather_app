import React, { useState, useEffect } from 'react';
import "./WeatherApp.css";
import search_icon from "../../assets/search.png";
import cloud_icon from "../../assets/cloud.png";
import humidity_icon from "../../assets/humidity.png";
import wind_icon from "../../assets/wind.png";
import clear_icon from "../../assets/clear.png";
import drizzle_icon from "../../assets/drizzle.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";

const WeatherApp = () => {
    let api_key = "28a87ac6c2df9536bbb4c6872537097c";

    const [records, setRecords] = useState({});
    const [city, setCity] = useState('');
    const [wicon, setWicon] = useState(cloud_icon);

    const search = () => {
        if (city === "") {
            return;
        } else {
            fetchWeatherData();
        }
    };

    const fetchWeatherData = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`)
            .then(response => response.json())
            .then(data => setRecords(data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        // Call the API initially when the component mounts
        fetchWeatherData();
    }, [city]); // Re-run the effect whenever the 'city' state changes

    // Update weather icon based on weather condition
    useEffect(() => {
        if (records.weather) {
            const weatherIcon = records.weather[0].icon;
            if (weatherIcon === "01d" || weatherIcon === "01n"){
                setWicon(clear_icon)
            }
            else if (weatherIcon === "02d" || weatherIcon === "02n"){
                setWicon(cloud_icon)
            }
            else if (weatherIcon === "03d" || weatherIcon === "03n"){
                setWicon(drizzle_icon)
            }
            else if (weatherIcon === "04d" || weatherIcon === "04n"){
                setWicon(drizzle_icon)
            }
            else if (weatherIcon === "09d" || weatherIcon === "09n"){
                setWicon(rain_icon)
            }
            else if (weatherIcon === "10d" || weatherIcon === "10n"){
                setWicon(rain_icon)
            }
            else if (weatherIcon === "13d" || weatherIcon === "13n"){
                setWicon(snow_icon)
            }
            else{
                setWicon(clear_icon)
            }
        }
    }, [records]);

    return (
        <div className='container'>
            <div className="top-bar">
                <input
                    type="text"
                    className="cityInput"
                    placeholder='Search'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <div className="searchIcon">
                    <img src={search_icon} onClick={search} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">{records.main && records.main.temp} °c</div>
            <div className="weather-location">{records.name}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{records.main && records.main.humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">{records.wind && records.wind.speed} Km/hr</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
