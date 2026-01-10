// Access the DOM
const themeSwitch = document.getElementById('switch');
const root = document.documentElement;

const weatherMap = {
  0: { icon: 'sunnyL.svg', description: 'Clear Sky' },

  1: { icon: 'sunnyL.svg', description: 'Mainly clear' },
  2: { icon: 'partlyCloudy.svg', description: 'Partly cloudy' },
  3: { icon: 'cloudL.svg', description: 'Overcast' },

  45: { icon: 'fogL.svg', description: 'Fog' },
  48: { icon: 'fogL.svg', description: 'Depositing rime fog' },

  51: { icon: 'drizzleL.svg', description: 'Light drizzle' },
  53: { icon: 'drizzleL.svg', description: 'Moderate drizzle' },
  55: { icon: 'drizzleL.svg', description: 'Dense drizzle"' },

  61: { icon: 'rainL.svg', description: 'Slight rain' },
  63: { icon: 'rainL.svg', description: 'Moderate rain' },
  65: { icon: 'rainL.svg', description: 'Heavy rain' },

  71: { icon: 'snowL.svg', description: 'Slight snow' },
  73: { icon: 'snowL.svg', description: 'Moderate snow' },
  75: { icon: 'snowL.svg', description: 'Heavy snow' },

  80: { icon: 'rainL.svg', description: 'Slight Rain showers' },
  81: { icon: 'rainL.svg', description: 'Moderate Rain showers' },
  82: { icon: 'rainL.svg', description: 'Violent Rain showers' },

  85: { icon: 'snowL.svg', description: 'Slight Snow shower' },
  86: { icon: 'snowL.svg', description: 'Heavy snow shower' },

  95: { icon: 'thunderstormL.svg', description: 'Thunderstorm' },
  96: { icon: 'thunderstormL.svg', description: 'Thunderstorm w/ hail' },
  99: { icon: 'thunderstormL.svg', description: 'Severe thunderstorm' },
};

// 1. Check if there is a saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
  themeSwitch.checked = true;
} else if (savedTheme === 'light') {
  root.setAttribute('data-theme', 'light');
  themeSwitch.checked = false;
} else {
  //Default Theme: light
  root.setAttribute('data-theme', 'light');
  themeSwitch.checked = false;
}

// 2. Listen the checkebox of the toggle and change the theme
themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    root.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Event Listeners (Button + Input)

const searchBtn = document.querySelector('.search_btn');
const searchInput = document.querySelector('#search');

searchBtn.addEventListener('click', () => {
  const input = searchInput.value.trim();

  if (input === '') {
    return;
  }
  getGeocodingData(input);
  searchInput.value = '';
});

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const input = searchInput.value.trim();
    if (input === '') {
      return;
    }
    getGeocodingData(input);
    searchInput.value = '';
  }
});

// Get lan/lon
async function getGeocodingData(search) {
  const notFound = document.querySelector('.notFound');
  const UI = document.querySelector('#weatherUI');
  // let search = 'Larisa';
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1&language=en&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);

    if (!result.results || result.results.length === 0) {
      // alert('Location NOT found!');
      notFound.textContent = `The location ${search} was not Found...`;
      notFound.classList.remove('hide');
      UI.classList.add('hidden');
      return;
    }
    notFound.classList.add('hide');
    notFound.textContent = '';

    UI.classList.remove('hidden');

    let lat = result.results[0].latitude;
    let lon = result.results[0].longitude;

    // loadLocationData(result);
    getWeatherData(lat, lon, result);
  } catch (error) {
    console.error(error.message);
  }
}

//Get weatherData

async function getWeatherData(lat, lon, locationData) {
  // TODO: Toggle C -> F

  // let tempUnit = 'celsius';
  // let windUnit = 'kmh';
  // let precipitationUnit = 'mm';

  //   if (toggleValue) {
  //     tempUnit = 'fahrenheit';
  //     windUnit = 'mph';
  //     precipitationUnit = 'inch';
  //   }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);

    loadLocationData(locationData, result);
    loadWeatherData(result);
  } catch (error) {
    console.error(error.message);
  }
}

function loadLocationData(locationData, weatherData) {
  let cityName = locationData.results[0].name;
  let countryName = locationData.results[0].country;

  const apiTimeStamp = weatherData.current.time;
  let date = new Date(apiTimeStamp);
  const cityTimeZone = weatherData.timezone;

  const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    timeZone: cityTimeZone,
  };
  let formattedDate = date.toLocaleDateString('en-GB', dateOptions);

  const dateOfWeekOptions = {
    weekday: 'long',
    timeZone: cityTimeZone,
  };
  let dayOfWeek = date.toLocaleDateString('en-GB', dateOfWeekOptions);

  console.log(formattedDate);
  console.log(`${cityName}, ${countryName}`);

  const currCityCountry = document.querySelector('#currCityCountry');
  const currDate = document.querySelector('#currDate');
  const hourlyDay = document.querySelector('.hourly_day');

  currCityCountry.textContent = `${cityName}, ${countryName}`;
  currDate.textContent = formattedDate;
  hourlyDay.textContent = dayOfWeek;
}

// CURRENT

function loadWeatherData(weather) {
  const currTemp = document.querySelector('#currTemp');

  let temp = Math.round(`${weather.current.temperature_2m}`);
  currTemp.textContent = `${temp}°`;

  const currIcon = document.querySelector('.current_iconText img');
  const currText = document.querySelector('.current_text');

  const weatherCode = weather.current.weather_code;
  const iconData = getIconByWeatherCode(weatherCode);

  currIcon.src = `assets/icons/light_mode/${iconData.icon}`;
  currText.textContent = iconData.description;

  console.log(weatherCode);

  const feelsLike = document.querySelector('#feelsLike');
  const humidity = document.querySelector('#humidity');
  const wind = document.querySelector('#wind');
  const precipitation = document.querySelector('#percipitetion');

  feelsLike.textContent = weather.current.apparent_temperature;
  humidity.textContent = weather.current.relative_humidity_2m;

  wind.textContent = `${weather.current.wind_speed_10m} ${weather.current_units.wind_speed_10m}`;
  precipitation.textContent = `${weather.current.precipitation} ${weather.current_units.precipitation}`;

  loadDailyForecast(weather.daily, iconData);
  loadHourlyForecast(weather.hourly, iconData);
}

//Weather_code resolver
function getIconByWeatherCode(weatherCode) {
  if (weatherMap[weatherCode]) {
    return weatherMap[weatherCode];
  } else {
    return { icon: 'unknown.svg', description: 'Unknown' };
  }
}

// DAILY
function loadDailyForecast(daily, iconData) {
  const dailyForecast = document.querySelector('.daily_forecast');

  dailyForecast.innerHTML = '';

  const daysCount = daily.time.length;
  console.log(daysCount);
  console.log(daily);

  for (let i = 1; i < daysCount; i++) {
    const date = new Date(daily.time[i]);
    const nameDay = date.toLocaleDateString('en-GB', { weekday: 'short' });

    const maxTemp = Math.round(daily.temperature_2m_max[i]);
    const minTemp = Math.round(daily.temperature_2m_min[i]);

    const dayCode = daily.weather_code[i];
    const dayIcon = getIconByWeatherCode(dayCode);

    //Create the Element
    const dayElement = document.createElement('div');
    dayElement.className = 'daily_day';

    dayElement.innerHTML = ` 
            <p class="daily_day-title">${nameDay}</p>   
            <img
                class="daily_day-icon icon"
                src="assets/icons/light_mode/${dayIcon.icon}"
                width="20px" 
            />
            <div class="daily_day-temps">
              <p class="daily_day-high"><span>${maxTemp}</span>°</p>
              <p class="daily_day-low"><span>${minTemp}</span>°</p>
            </div>
        `;

    dailyForecast.appendChild(dayElement);
  }
}

// Ηourly
function loadHourlyForecast(hour) {
  const hourlyForecast = document.querySelector('.hourly_hours');

  hourlyForecast.innerHTML = '';

  const HOURS_TO_SHOW = 8;
  const totalHours = hour.time.length;
  const limit = Math.min(HOURS_TO_SHOW, totalHours);

  for (let i = 0; i < limit; i++) {
    // 1. Format hour label
    const date = new Date(hour.time[i]);
    const hourLabel = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });

    // 2. Temperature
    const temp = Math.round(hour.temperature_2m[i]);

    // 3. Weather code → icon
    const code = hour.weather_code[i];
    const iconHourData = getIconByWeatherCode(code);

    // 4. Create the hourly card element
    const hourElement = document.createElement('div');
    hourElement.classList.add('hourly_hour');

    hourElement.innerHTML = `
      <img
        class="hourly_hour-icon icon"
        src="assets/icons/light_mode/${iconHourData.icon}"
        alt="${iconHourData.description}"
        width="40"
        height="40"
      />
      <p class="hourly_hour-time">${hourLabel}</p>
      <p class="hourly_hour-temp">${temp}°</p>
    `;

    hourlyForecast.appendChild(hourElement);
  }
}
