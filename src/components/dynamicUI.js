import humidityIconPath from "../assets/icons/humidity.svg";
import windSpeedPath from "../assets/icons/windsock.svg";
import precipitationIconPath from "../assets/icons/umbrella.svg";
import sunriseIconPath from "../assets/icons/sunrise.svg"
import sunsetIconPath from "../assets/icons/sunset.svg"

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

async function updateWeeklyForecast(weatherData) {
    const weeklyContainer = document.querySelector(".weekly-forecast");

    weeklyContainer.innerHTML = "";

    const nextDays = weatherData.nextDays;
    for (const item of nextDays) {
        const iconPath = await setWeatherIcon(item.icon);

        const itemContainer = createElement("div", ["weekly-item-container"]);
        const icon = createElement("img", ["weekly-forecast-icon"], "", {}, { src: iconPath });
        const day = createElement("h4", ["weekly-forecast-day"], item.day);
        const temp = createElement("div", ["weekly-forecast-temp"], item.temperature + "°");
        const feelsLike = createElement("div", ["weekly-forecast-feels-like"], "Feels like: " + item.feelsLike + "°");
        const condition = createElement("div", ["weekly-forecast-condition"], item.condition);

        appendToContainer(itemContainer, day);
        appendToContainer(itemContainer, icon);
        appendToContainer(itemContainer, temp);
        appendToContainer(itemContainer, feelsLike);
        appendToContainer(itemContainer, condition);

        appendToContainer(weeklyContainer, itemContainer);
    };
}

// Helper Functions
async function setWeatherIcon(iconName) {
    const iconPromise = await import(`../assets/icons/${iconName}.svg`);
    return iconPromise.default;
}

// Create an element
function createElement(tag, classes = [], text = "", datasets = {}, attributes = {}) {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    element.textContent = text;

    for (const [key, value] of Object.entries(datasets)) {
        element.dataset[key] = value
    }

    for (const [attr, value] of Object.entries(attributes)) {
        if (attr in element) {
            element[attr] = value;
        } else {
            element.setAttribute(attr, value);
        }
    }

    return element;
}

// Update an element
function updateElement(selector, attribute, value) {
    const element = document.querySelector(selector);
    if (element) {
        if (attribute in element) {
            element[attribute] = value;
        } else {
            element.setAttribute(attribute, value);
        }
    } else {
        console.warn(`Element not found for selector: ${selector}`);
    }
}

// Append the element to a container
function appendToContainer(parent, element) {
    const container = typeof parent === "string" ? document.querySelector(parent) : parent;
    if (container) {
        container.appendChild(element);
    } else {
        console.warn("Parent container not found/invalid")
    }
}

export {updateTodayForecast, updateWeeklyForecast, createElement, updateElement, appendToContainer}


