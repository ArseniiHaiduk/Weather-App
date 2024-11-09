const apiKey = "e647276f5006b92f62a6ddfe5f9b8865";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}${`&appid=${apiKey}`}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
      weatherIcon.alt = `${data.weather[0].main}`;
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.webp";
      weatherIcon.alt = `${data.weather[0].main}`;
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
      weatherIcon.alt = `${data.weather[0].main}`;
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      weatherIcon.alt = `${data.weather[0].main}`;
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.webp";
      weatherIcon.alt = `${data.weather[0].main}`;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
