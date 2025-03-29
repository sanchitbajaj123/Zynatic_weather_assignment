# 🌦️ Weather App

A React-based weather application that fetches and displays real-time weather information using OpenWeather API. The app includes local storage support for saving recent searches and state management using React Hooks.

---

## 🚀 Tech Stack

- **Frontend:** React.js, Axios, React Toastify
- **State Management:** useState, useEffect
- **Local Storage:** To persist recent searches
- **API:** OpenWeather API for fetching weather data
- **Styling:** CSS, Flexbox/Grid

---

## 📌 Features

✅ Search for weather by city name  
✅ Displays temperature, humidity, wind speed, and weather condition  
✅ Error handling for invalid cities  
✅ Stores recent searches using **localStorage**  
✅ Styled notifications with **React-Toastify**  
✅ Modern UI with smooth transitions  

---

## 🏗️ State Management & Local Storage  

### 🔹 useState:  
- Used to manage the state of the **search input, weather data, and recent searches**.  

#### Example states:  
- `weatherData` → Stores the fetched weather details.  
- `city` → Holds the user input for city name.  
- `recentSearches` → Stores previously searched cities.  

---

### 🔹 useEffect:  
- Used to **fetch weather data** when a city is searched.  
- Used to **load recent searches from localStorage** when the component mounts.  
- Triggers updates when `city` or `weatherData` changes.  

---

### 🔹 Local Storage:  
- Saves **recently searched cities** so they persist after page reload.  
- **Retrieves saved searches** when the app is reopened.  

#### Example usage:  
```javascript
localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

const savedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
-----
Live Link:https://zynatic-weather-assignment.vercel.app/
![Screenshot (368)](https://github.com/user-attachments/assets/81577be9-014a-4845-92d9-3abb95c77632)

