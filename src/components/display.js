import { changeUnit, changeLocation, fetchWeather } from "./fetchWeather";

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

async function updateWeatherInfo() {
    try {
        const weatherData = await fetchWeather();

        const location = document.querySelector(".location");
        location.textContent = weatherData.general.address;

        const date = document.querySelector(".date");
        date.textContent = weatherData.general.date;

    } catch (e) {
        console.log("Failed to update weather info:", e);
    }
}

// Event Listeners
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", (event) => {
    event.preventDefault;
    setLocation();
    updateWeatherInfo();
});

export {updateWeatherInfo};