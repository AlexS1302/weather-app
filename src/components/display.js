import { changeUnit, changeLocation, fetchWeather } from "./fetchWeather";

function setLocation() {
    const searchBar = document.getElementById("search");
    const searchString = searchBar.value;
    searchBar.value = "";
    changeLocation(searchString);
}

function setUnitGroup() {
    const unit = document.getElementById("units")
    changeUnit(unit.value);
}