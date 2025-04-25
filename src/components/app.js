
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


