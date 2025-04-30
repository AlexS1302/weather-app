import { changeUnit, changeLocation, fetchWeather } from "./fetchWeather";
import { updateTodayForecast, updateWeeklyForecast } from "./dynamicUI";

async function updateWeatherInfo() {
    try {
        const weatherData = await fetchWeather();
        updateTodayForecast(weatherData);
        updateWeeklyForecast(weatherData);

    } catch (e) {
        console.error("Failed to update weather info:", e);
    }
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


export {updateWeatherInfo};