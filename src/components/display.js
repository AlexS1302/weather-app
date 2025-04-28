import { changeUnit, changeLocation, fetchWeather } from "./fetchWeather";
import humidityIconPath from "../assets/icons/humidity.svg";
import windSpeedPath from "../assets/icons/windsock.svg";
import precipitationIconPath from "../assets/icons/umbrella.svg";

async function updateWeatherInfo() {
    try {
        const weatherData = await fetchWeather();
        updateTodayForecast(weatherData);

    } catch (e) {
        console.log("Failed to update weather info:", e);
    }
}

async function updateTodayForecast(weatherData) {
    const location = document.querySelector(".location");
    location.textContent = weatherData.general.address;

    const date = document.querySelector(".date");
    date.textContent = weatherData.general.date;

    const weatherIcon = document.querySelector(".weather-icon");
    const iconPath = await setWeatherIcon(weatherData.current.weatherIcon);
    weatherIcon.src = iconPath;

    const temperature = document.querySelector(".temperature");
    temperature.textContent = weatherData.current.temperature + "°";

    const feelsLike = document.querySelector(".feels-like");
    feelsLike.textContent = "Feels like: " + weatherData.current.feelsLike + "°";

    const weatherCondition = document.querySelector(".weather-condition");
    weatherCondition.textContent = weatherData.current.condition;

    const precipitationIcon = document.querySelector(".precipitation-icon");
    precipitationIcon.src = precipitationIconPath;
    const precipitation = document.querySelector(".precipitation-value");
    precipitation.textContent = weatherData.current.precipitation + "%";

    const humidityIcon = document.querySelector(".humidity-icon");
    humidityIcon.src = humidityIconPath;
    const humidity = document.querySelector(".humidity-value");
    humidity.textContent = weatherData.current.humidity + "%";
    
    const windSpeedIcon = document.querySelector(".wind-speed-icon");
    windSpeedIcon.src = windSpeedPath;
    const windSpeed = document.querySelector(".wind-speed-value");
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