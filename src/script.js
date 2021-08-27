/// Date ///
let now = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let today = `${day} ${hours}:${minutes}`;
  return today;
}

let newdate = document.querySelector(".today");
newdate.innerHTML = formatDate(now);

/// Search City ///

function searchCity(city) {
  let apiKey = "4f53bb6fbafe6f11bafb0801af7db36a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let location = document.querySelector("h1");
  location.innerHTML = `${searchInput.value}:`;
  searchCity(searchInput.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function showTemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".temp-description").innerHTML =
    response.data.weather[0].description;
}

/// Search Location ///
function handlePosition(position) {
  let apiKey = "4f53bb6fbafe6f11bafb0801af7db36a";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

function getCurrentData() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentData);

searchCity("Yosemite");
