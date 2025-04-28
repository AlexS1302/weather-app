import { changeUnit, changeLocation, fetchWeather } from "./fetchWeather";
import humidityIconPath from "../assets/icons/humidity.svg";
import windSpeedPath from "../assets/icons/windsock.svg";

async function updateWeatherInfo() {
    try {
        const weatherData = await fetchWeather();
        updateTodayForecast(weatherData);

    } catch (e) {
        console.log("Failed to update weather info:", e);
    }
}

async function updateTodayForecast(weatherData) {
    // Left card section
    const location = document.querySelector(".location");
    location.textContent = weatherData.general.address;

    const date = document.querySelector(".date");
    date.textContent = weatherData.general.date;

    const weatherIcon = document.querySelector(".weather-icon");
    const iconPath = await setWeatherIcon(weatherData.current.weatherIcon);
    weatherIcon.src = iconPath;

    const temperature = document.querySelector(".temperature");
    temperature.textContent = weatherData.current.temperature;

    const weatherDescription = document.querySelector(".weather-desc");
    weatherDescription.textContent = weatherData.current.condition;

    // Right card section
    const humidityIcon = document.querySelector(".humidity-icon");
    humidityIcon.src = humidityIconPath;
    const humidity = document.querySelector(".humidity");
    humidity.textContent = weatherData.current.humidity;
    
    const windSpeedIcon = document.querySelector(".wind-speed-icon");
    windSpeedIcon.src = windSpeedPath;
    const windSpeed = document.querySelector(".wind-speed");
    windSpeed.textContent = weatherData.current.windSpeed;
}


// Event Listeners
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", (event) => {
    event.preventDefault;
    setLocation();
    updateWeatherInfo();
});

// Helper Functions
function setLocation() {
    const searchBar = document.getElementById("search");
    const searchString = searchBar.value;
    changeLocation(searchString);
    searchBar.value = "";
}

function setUnitGroup() {
    const unit = document.getElementById("units")
    changeUnit(unit.value);
}

async function setWeatherIcon(iconName) {
    const iconPromise = await import(`../assets/icons/${iconName}.svg`);
    return iconPromise.default;
}

export {updateWeatherInfo};