import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

// API URL
const apiObj = {
    url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
    apiKey: "XZ9HVLETE6FD26XK25HYB63WH",
    unitGroup: "uk",
    locationString: "London",
    apiString() {
        const unit = "unitGroup=" + (this.unitGroup || "uk");
        const location = this.locationString || "London";
        return `${this.url}${location}?${unit}&key=${this.apiKey}`;
    },
};

function changeUnit(unitGroup) {
    apiObj.unitGroup = unitGroup;
}

function changeLocation(location) {
    apiObj.locationString = location;
}

async function fetchWeather() {
    try {
        const weatherCall = await fetch(apiObj.apiString());
        const weatherData = await weatherCall.json();
        console.log("Weather Data:", weatherData)
        
        const processedData = processData(weatherData);
        return processedData;
    } catch (e) {
        console.error("Failed to fetch weather info:", e);
    }
}

function processData(weatherObj) {
    if (!weatherObj || !weatherObj.currentConditions) {
        throw new Error("Invalid data structure");
    }

    const requiredData = {
        general: {
            address: weatherObj.resolvedAddress,
            get currentTime() {
                return new TZDate(new Date(), weatherObj.timezone);
            },
            get time() {
                return format(this.currentTime, "HH:mm");
            },
            get date() {
                return format(this.currentTime, "do MMMM yyyy");
            },
            get sunriseTime() {
                return weatherObj.currentConditions.sunrise.slice(0, 5);
            },
            get sunsetTime() {
                return weatherObj.currentConditions.sunset.slice(0, 5);
            }
        },
        timezone: weatherObj.timezone,
        current: {
            condition: weatherObj.currentConditions.conditions,
            time: weatherObj.currentConditions.datetime,
            feelsLike: weatherObj.currentConditions.feelslike,
            humidity: weatherObj.currentConditions.humidity,
            weatherIcon: weatherObj.currentConditions.icon,
            temperature: weatherObj.currentConditions.temp,
            windSpeed: weatherObj.currentConditions.windspeed,
            precipitation: weatherObj.currentConditions.precipprob,
            sunrise: weatherObj.currentConditions.sunrise,
            sunset: weatherObj.currentConditions.sunset,
        },
    };

    return requiredData;
}

export {changeUnit, changeLocation, fetchWeather};