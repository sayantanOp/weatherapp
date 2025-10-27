const api_key = "903cb1c142245e515476ecbe14899493";

const weatherDataEl = document.querySelector(".weather-body");
const searchInput = document.querySelector("#city");
const searchButton = document.querySelector("#searchBtn");

async function checkWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const weather_data = await response.json();
    console.log(weather_data);

    // Extract main data
    const temperature = Math.round(weather_data.main.temp);
    const feels_like = Math.round(weather_data.main.feels_like);
    const humidity = weather_data.main.humidity;
    const wind_speed = weather_data.wind.speed;
    const description = weather_data.weather[0].description;
    const icon = weather_data.weather[0].icon;
    const country = weather_data.sys.country;

    // Update UI
    document.querySelector(".city").innerHTML = `${weather_data.name}, ${country}`;
    document.querySelector(".temperature").innerHTML = `${temperature}°C`;
    document.querySelector(".feelslike").innerHTML = `Feels like ${feels_like}°C`;
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".humidity span").innerHTML = `${humidity}%`;
    document.querySelector(".wind span").innerHTML = `${wind_speed} m/s`;

    document.querySelector(".weather-img").src = `assets/${getWeatherIcon(icon)}`;
    weatherDataEl.style.display = "block";
  } catch (error) {
    alert("❌ Error: " + error.message);
    weatherDataEl.style.display = "none";
  }
}

function getWeatherIcon(iconCode) {
  // Match OpenWeather icon codes to your local assets
  if (iconCode.startsWith("01")) return "clear.png";
  if (iconCode.startsWith("02")) return "cloudy.png";
  if (iconCode.startsWith("03") || iconCode.startsWith("04")) return "overcast.png";
  if (iconCode.startsWith("09") || iconCode.startsWith("10")) return "rain.png";
  if (iconCode.startsWith("11")) return "storm.png";
  if (iconCode.startsWith("13")) return "snow.png";
  if (iconCode.startsWith("50")) return "mist.png";
  return "default.png";
}

// Search button click
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name 🌆");
  }
});