import { TZDate } from "@date-fns/tz";
import { format, fromUnixTime } from "date-fns";

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
        console.log("Weather Data JSON:", weatherData)
        
        const processedData = processData(weatherData);
        return processedData;
    } catch (e) {
        console.log("Error:", e);
    }
}

function processData(parsedJSON) {
    if (!parsedJSON || !parsedJSON.currentConditions) {
        throw new Error("Invalid JSON structure");
    }
    
    const jsonObj = parsedJSON;

    const requiredData = {
        address: jsonObj.resolvedAddress,
        get currentTime() {
            return new TZDate(new Date(), "Europe/London");
        },
        get time() {
            return format(this.currentTime, "HH:mm:ss");
        },
        get date() {
            return format(this.currentTime, "do MMMM yyyy");
        },

        timezone: jsonObj.timezone,
        current: {
            condition: jsonObj.currentConditions.conditions,
            time: jsonObj.currentConditions.datetime,
            localisedDateTime: new TZDate(
                fromUnixTime(jsonObj.currentConditions.datetimeEpoch),
                jsonObj.timezone,
            ),
            feelsLike: jsonObj.currentConditions.feelslike,
            humidity: jsonObj.currentConditions.humidity,
            weatherIcon: jsonObj.currentConditions.icon,
            temperature: jsonObj.currentConditions.temp,
            windSpeed: jsonObj.currentConditions.windspeed,
        },
    };
}
