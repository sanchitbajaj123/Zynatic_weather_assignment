
import './App.css';
import { useState, useEffect } from 'react';
import { getData } from './api';

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const d = await getData('London');
      console.log(d);
      setData(d);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : data ? (
        <div>
          <h2>{data.name}</h2>
          <p>Temperature: {data.main.temp}°C</p>
          <p>Weather: {data.weather[0].description}</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} km/h</p>
        </div>
      ) : (
        <p>Error loading weather data.</p>
      )}
    </div>
  );
}

export default App;
