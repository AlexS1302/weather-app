import { changeUnit, changeLocation, fetchWeather } from "./fetchWeather";
import humidityIconPath from "../assets/icons/humidity.svg";
import windSpeedPath from "../assets/icons/windsock.svg";
import precipitationIconPath from "../assets/icons/umbrella.svg";
import sunriseIconPath from "../assets/icons/sunrise.svg"
import sunsetIconPath from "../assets/icons/sunset.svg"
import { appendToContainer, createElement, updateElement } from "./dynamicUI";

async function updateWeatherInfo() {
    try {
        const weatherData = await fetchWeather();
        updateTodayForecast(weatherData);
        updateWeeklyForecast(weatherData);

    } catch (e) {
        console.error("Failed to update weather info:", e);
    }
}

async function updateTodayForecast(weatherData) {
    // Card header
    updateElement(".location", "textContent", weatherData.general.address);
    updateElement(".date", "textContent", weatherData.general.date);
    updateElement(".time", "textContent", weatherData.general.time);

    // Weather details
    const iconPath = await setWeatherIcon(weatherData.current.weatherIcon);
    updateElement(".weather-icon", "src", iconPath);
    updateElement(".temperature", "textContent", weatherData.current.temperature + "°");
    updateElement(".feels-like", "textContent", "Feels like: " + weatherData.current.feelsLike + "°");
    updateElement(".weather-condition", "textContent", weatherData.current.condition);

    // Weather other
    updateElement(".precipitation-icon", "src", precipitationIconPath);
    updateElement(".precipitation-value", "textContent", weatherData.current.precipitation + "%");

    updateElement(".humidity-icon", "src", humidityIconPath);
    updateElement(".humidity-value", "textContent", weatherData.current.humidity + "%");

    updateElement(".wind-speed-icon", "src", windSpeedPath);
    updateElement(".wind-speed-value", "textContent", weatherData.current.windSpeed);

    updateElement(".sunrise-icon", "src", sunriseIconPath);
    updateElement(".sunrise-time", "textContent", weatherData.general.sunriseTime);

    updateElement(".sunset-icon", "src", sunsetIconPath);
    updateElement(".sunset-time", "textContent", weatherData.general.sunsetTime);
}

function updateWeeklyForecast(weatherData) {
    const nextDays = weatherData.nextDays;
    nextDays.forEach(item => {
        const container = createElement("div", ["weekly-item-container"]);
        const day = createElement("h4", ["weekly-forecast-day"], item.day);
        const temp = createElement("div", ["weekly-forecast-temp"], item.temperature);
        const condition = createElement("div", ["weekly-forecast-condition"], item.condition);

        appendToContainer(container, day);
        appendToContainer(container, temp);
        appendToContainer(container, condition);

        appendToContainer(".weekly-forecast", container);
    });
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