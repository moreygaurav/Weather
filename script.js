const apiKey = "059d43b4a39c2a3eb1b0347bbd8fff0a";         
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const form      = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const errorBox  = document.getElementById("error");

const tempEl  = document.getElementById("temp");
const cityEl  = document.getElementById("city");
const humEl   = document.getElementById("humidity");
const windEl  = document.getElementById("wind");
const iconEl  = document.getElementById("icon");

form.addEventListener("submit", (e) => {
  e.preventDefault();              
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

/* ---------------- main fetch logic ---------------- */
async function fetchWeather(city){
  // reset previous state
  errorBox.textContent = "";
  tempEl.textContent   = "--°C";
  cityEl.textContent   = "--";
  humEl.textContent    = "--%";
  windEl.textContent   = "-- km/h";
  iconEl.src = iconEl.alt = "";

  try{
    const url = `${apiUrl}?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    if(!res.ok) throw new Error("City not found");
    const data = await res.json();
    updateUI(data);
  }catch(err){
    errorBox.textContent = err.message;
  }
}

function updateUI(data){
  tempEl.textContent = Math.round(data.main.temp) + "°C";
  cityEl.textContent = data.name.toUpperCase();
  humEl.textContent  = data.main.humidity + "%";
  windEl.textContent = (data.wind.speed * 3.6).toFixed(1) + " km/h";

  const ic = data.weather[0].icon;
  iconEl.src = `https://openweathermap.org/img/wn/${ic}@4x.png`;
  iconEl.alt = data.weather[0].description;
}
