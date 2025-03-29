import "./App.css";
import { useState, useEffect } from "react";
import { getData, getCity } from "./api";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [history, setHistory] = useState(
    () => JSON.parse(localStorage.getItem("cities")) || []
  );
  const [historyData, setHistoryData] = useState([]);

  const weatherIcons = {
    Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    Clouds: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
    Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
    Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  };

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
      const weatherData = await Promise.all(
        history.map(async (city) => await getData(city))
      );
      setHistoryData(weatherData);
    };

    if (history.length) {
      fetchHistoryData();
    }
  }, [history]);

  return (
    <div className={`app ${theme}`}>
      <div className="title">
      <h1>Weather App</h1>

      <div className="theme-toggle">
        <span>🌙</span>
        <input
          type="range"
          min="0"
          max="1"
          step="1"
          value={theme === "dark" ? 0 : 1}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <span>☀️</span>
      </div>
      </div>

      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button className="search-btn" onClick={() => setCity(inputCity)}>
          Get Weather
        </button>
      </div>

     
      {loading ? (
        <div className="loader"></div>
      ) : data ? (
        <div className="weather-card">
          <h1>{data.name}</h1>
          <img
            src={weatherIcons[data.weather[0].main] || weatherIcons["Clear"]}
            alt="weather-icon"
            className="weather-icon"
          />
          <p>Temperature: {data.main.temp}°C</p>
          <p>Weather: {data.weather[0].description}</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} km/h</p>
        </div>
      ) : (
        <p className="error">Error loading weather data.</p>
      )}

      
      {historyData.length > 0 && (
        <div className="history-container">
          <h3>Recent Searches:</h3>
          <div className="history-grid">
            {historyData.map((weather, index) => (
              <div
                key={index}
                className="history-card"
                onClick={() => setCity(weather.name)}
              >
                <h4>{weather.name}</h4>
                <img
                  src={weatherIcons[weather.weather[0].main] || weatherIcons["Clear"]}
                  alt="weather-icon"
                  className="weather-icon-small"
                />
                <p>Temp: {weather.main.temp}°C</p>
                <p>{weather.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
