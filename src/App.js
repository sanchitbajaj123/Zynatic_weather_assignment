import './App.css';
import { useState, useEffect } from 'react';
import { getData, getCity } from './api';

const weatherIcons = {
  clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  clouds: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
  rain: "https://cdn-icons-png.flaticon.com/512/1163/1163634.png",
  snow: "https://cdn-icons-png.flaticon.com/512/1163/1163625.png",
  storm: "https://cdn-icons-png.flaticon.com/512/1779/1779802.png"
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("cities")) || []);
  const [historyData, setHistoryData] = useState([]);

  function handleHistory(city) {
    if (!history.includes(city)) {
      const updatedHistory = [city, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("cities", JSON.stringify(updatedHistory));
    }
  }

  useEffect(() => {
    const fetchData = async (city) => {
      setLoading(true);
      const d = await getData(city);
      setData(d);
      setLoading(false);
      if (d && d.name) handleHistory(d.name);
    };

    const getcity = async () => {
      const response = await getCity();
      if (response) {
        setCity(response);
        fetchData(response);
      }
    };

    city ? fetchData(city) : getcity();
  }, [city]);

  useEffect(() => {
    const fetchHistoryData = async () => {
      setHistoryData([]);
      const weatherData = await Promise.all(history.map(async (city) => await getData(city)));
      setHistoryData(weatherData);
    };

    if (history.length) {
      fetchHistoryData();
    }
  }, [history]);

  const getWeatherIcon = (description) => {
    if (description.includes("clear")) return weatherIcons.clear;
    if (description.includes("cloud")) return weatherIcons.clouds;
    if (description.includes("rain")) return weatherIcons.rain;
    if (description.includes("snow")) return weatherIcons.snow;
    if (description.includes("storm")) return weatherIcons.storm;
    return weatherIcons.clear;
  };

  return (
    <div className={`app ${theme}`}>
      <h1>Weather App</h1>
      <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button onClick={() => setCity(inputCity)}>Get Weather</button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : data ? (
        <div className="weather-card">
          <h2>{data.name}</h2>
          <img src={getWeatherIcon(data.weather[0].description)} alt="weather icon" className="weather-icon" />
          <p>Temperature: {data.main.temp}°C</p>
          <p>Weather: {data.weather[0].description}</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} km/h</p>
        </div>
      ) : (
        <p className="error">Error loading weather data.</p>
      )}

      {historyData.length > 0 && (
        <div className="history">
          <h3>Recent Searches:</h3>
          <ul>
            {historyData.map((weather, index) => (
              <li key={index} onClick={() => setCity(weather.name)} className="history-item">
                <h4>{weather.name}</h4>
                <img src={getWeatherIcon(weather.weather[0].description)} alt="weather" className="history-icon" />
                <p>Temp: {weather.main.temp}°C</p>
                <p>{weather.weather[0].description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
