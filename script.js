const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const input = document.querySelector(".bruh");
const apikey = "8e5372966b91bfdc34bf7cfa833436b4";

function WeatherSearch() {
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${input.value}&appid=${apikey}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                // gets lat, lon and name from the first index of the array from the api  
                const { lat, lon, name } = data[0];
                fetchWeatherData(lat, lon, name);
            } else {
                temp.innerHTML = "City not found";
                city.innerHTML = "";    
            }
        })
        .catch((error) => {
            temp.innerHTML = "Error fetching data";
            city.innerHTML = "";
            console.error("Error fetching data:", error);
        });
}

function fetchWeatherData(lat, lon, name) {
    let updatedUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

    fetch(updatedUrl)
        .then((response) => response.json())
        .then((data) => {
            // convert kelvin to fahrenheit
            if (Math.round(data.main.temp * 9 / 5 - 459.67) >= 85) {
                temp.innerHTML = `${Math.round(data.main.temp * 9 / 5 - 459.67)}°F 🥵`;
                city.innerHTML = `${name}`;
            } else if (Math.round(data.main.temp * 9 / 5 - 459.67) > 60) {
                temp.innerHTML = `${Math.round(data.main.temp * 9 / 5 - 459.67)}°F 😎`;
                city.innerHTML = `${name}`;
            } else if (Math.round(data.main.temp * 9 / 5 - 459.67) < 60) {
                temp.innerHTML = `${Math.round(data.main.temp * 9 / 5 - 459.67)}°F 🥶`;
                city.innerHTML = `${name}`;
            }
        })
        .catch((error) => {
            temp.innerHTML = "Error fetching weather data";
            city.innerHTML = "";
            console.error("Error fetching weather data:", error);
        });
}

input.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        WeatherSearch();
    }
});