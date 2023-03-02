function formatDate(timestemp) {
  let now = new Date(timestemp);

  let date = now.getDate();
  let hours = now.getHours();
  hours = (hours < 10 ? "0" : "") + hours;

  let minutes = now.getMinutes();
  minutes = (minutes < 10 ? "0" : "") + minutes;

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

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

  return `${day}, ${date} ${month} <br />${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "314f7f848c85494271461bad87b62591";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#seach-text-input").value;
  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

function showTemp(response) {
  document.querySelector(`#temperatureToday`).innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(`#humidity`).innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].main;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#currentlyDate").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector(`#temperature-today-icon`)
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "314f7f848c85494271461bad87b62591";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector(`#current-buttom`);
currentLocationButton.addEventListener("click", getCurrentPosition);
