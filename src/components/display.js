import { changeUnit, changeLocation, fetchWeather } from "./fetchWeather";


function getLocation() {
    const searchBar = document.getElementById("search");
    const searchString = searchBar.value;
    searchBar.value = "";
    changeLocation(searchString);
}