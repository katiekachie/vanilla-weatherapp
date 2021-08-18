//format and change date
let now = new Date();

let date = document.querySelector("#date");

let currentDate = now.getDate();
let currentHours = now.getHours();
let currentMins = now.getMinutes();

if (currentMins < 10) {
  currentMins = `0${currentMins}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];
date.innerHTML = `${day}, ${month} ${currentDate}, ${currentHours}:${currentMins}`;

// upcoming forecast code
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      ` 
        <div class="col upcomingWeather">
        <div class="upcomingWeatherheader">${forecastDay.dt}</div>
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
          ${forecastDay.temp}
        </div>
   `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bd628911ba641cac30d433a5b0ffb8c6";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

//change temperature
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let highElement = document.querySelector("#high");
  let lowElement = document.querySelector("#low");
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  highElement.innerHTML = Math.round(response.data.main.temp_max);
  lowElement.innerHTML = Math.round(response.data.main.temp_min);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(cityName) {
  let apiKey = "bd628911ba641cac30d433a5b0ffb8c6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayTemperature);
}

// selecting form
function clickSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-selector");
  search(cityInputElement.value);
}

//change f to c
function displayfahrenheitTemp(event) {
  event.preventDefault();
  newCelciusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let fahrenheitTempChange = (celciusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTempChange);
}

function displaycelciusTemp(event) {
  event.preventDefault();
  newCelciusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

// selecting form -- global variable
let form = document.querySelector("#search-form");
form.addEventListener("submit", clickSearch);

//change f to c -- global variable
let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", displayfahrenheitTemp);

let newCelciusTemp = document.querySelector("#celcius");
newCelciusTemp.addEventListener("click", displaycelciusTemp);

//current location

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(myLocation);
}

function myLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "bd628911ba641cac30d433a5b0ffb8c6";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayTemperature);
}

let currentLocation = document.querySelector("#check-location");
currentLocation.addEventListener("click", getCurrentLocation);

search("Torquay");
displayForecast();
