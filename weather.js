const openBtn = document.getElementById("openTab");
const closeBtn = document.getElementById("closeTab");
const tab = document.getElementById("weatherTab");
const overlay = document.getElementById("overlay");


closeBtn.addEventListener("click", () => {
  tab.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  tab.classList.remove("active");
  overlay.classList.remove("active");
});


function showWeatherDetails(city, data, lat, lng) {
  document.getElementById("cityName").textContent = `City: ${city} (Coords: ${lat}, ${lng})`;
  document.getElementById("temperature").textContent = `Temperature: ${data.temp}°C (Feels like ${data.feels_like}°C)`;
  document.getElementById("humidity").textContent = `Humidity: ${data.humidity}%`;
  document.getElementById("wind").textContent = `Wind: ${data.wind_speed} m/s, Direction: ${data.wind_degrees}°`;

 
  if (data.sunrise && data.sunset) {
    const sunrise = new Date(data.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sunset * 1000).toLocaleTimeString();
    document.getElementById("sunrise").textContent = `Sunrise: ${sunrise}`;
    document.getElementById("sunset").textContent = `Sunset: ${sunset}`;
  }

 
  tab.classList.add("active");
  overlay.classList.add("active");
}


function fetchGeoLocation() {
  openBtn.addEventListener('click', () => {
    let city = document.getElementById('cityInput').value;
    if (!city.trim()) {
      alert('Please enter a valid City');
      return;
    }

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=0fbf6d67d6b0495c9f7c6339d2ffd79e`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          console.log("Latitude:", lat, "Longitude:", lng);
          fetchWeatherData(city, lat, lng); 
        } else {
          alert('No results found for the specified city.');
        }
      })
      .catch(error => {
        console.error('Error fetching location:', error);
        alert('Failed to fetch location. Please try again.');
      });
  });
}
fetchGeoLocation();


async function fetchWeatherData(city, lat, lng) {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=${lat}&lon=${lng}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '800a45abc5msh5d97f3791b38545p1e66f4jsn92df696927f0',
      'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("Weather API result:", result);
    showWeatherDetails(city, result, lat, lng);
  } catch (error) {
    console.error("Weather fetch error:", error);
    alert("Failed to fetch weather data. Please try again.");
  }
}
