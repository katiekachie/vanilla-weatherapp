//format and change date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    minutes = `0${minutes}`;
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

  let day = days[now.getDay()];
  return `${day}, ${month} ${date} ${hours}:${minutes}`;
}

//change temperature
function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let highElement = document.querySelector("#high");
  let lowElement = document.querySelector("#low");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  highElement.innerHTML = response.data.main.temp_max;
  lowElement.innerHTML = response.data.main.temp_min;
}

let apiKey = "bd628911ba641cac30d433a5b0ffb8c6";
let city = "Torquay";
let apiURL = `api.openweathermap.org/data/2.5/weather?q=London&appid={API key}`;

axios.get(apiURL).then(displayTemperature);
