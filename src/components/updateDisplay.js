import { changeUnit, changeLocation, fetchWeather } from "./fetchWeather";
import { updateElement, updateTodayForecast, updateWeeklyForecast } from "./dynamicUI";

async function updateWeatherInfo() {
    try {
        const weatherData = await fetchWeather();
        updateTodayForecast(weatherData);
        updateWeeklyForecast(weatherData);
        setUnitGroup();

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

const dropdownMenu = document.querySelector(".dropdown-menu");
dropdownMenu.addEventListener("change", () => {
    setUnitGroup();
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
    const unit = document.getElementById("units").value;
    changeUnit(unit);
    
    let unitLabel = "";
    switch (unit) {
        case "uk":
            unitLabel = "km/h";
            break;
        case "metric":
            unitLabel = "m/s";
            break;
        case "us":
            unitLabel = "mph";
            break;
        case "base":
            unitLabel = "units";
            break;
    }
    updateElement(".wind-speed-unit", "textContent", ` ${unitLabel}`);
}
export {updateWeatherInfo};