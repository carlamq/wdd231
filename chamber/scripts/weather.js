const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDescription = document.querySelector('#weather-description');
const forecastContainer = document.querySelector('#forecast-container');

//four use the link in openweather without editing and do not mistakes
const lat = 35.86;
const lon = 139.98;
const apiKey = 'a647ab6712884ca27e08a792af2730e6';

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;

async function apiFetch() {
    try {
        const response = await fetch(currentWeatherUrl);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

//for 3 days forecast
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}
function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp); //data.main.temp comes in decimal, so we round it to the nearest integer
    const description = data.weather[0].description; //data.weather is an array, then take the first element and get the description
    const icon = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/w/${icon}.png`;

    currentTemp.innerHTML = `${temp}&deg;C`; //&deg;C is used to display the degree symbol in HTML
    weatherDescription.textContent = description;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', description);
}

//3 days forecast
function displayForecast(data) {
    //filter for daily forecasts at 12:00 PM
    const dailyForecasts = data.list.filter(item =>
        item.dt_txt.includes('12:00:00')
    ).slice(0, 3); // Limit to 3 days

    const forecastHTML = dailyForecasts.map(day => {//format the date and temperature
        const date = new Date(day.dt * 1000); //convert UNIX timestamp to Date object, 
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }); //get the day name
        const temp = Math.round(day.main.temp); //round the temperature to the nearest integer
        const icon = day.weather[0].icon; //get the weather icon
        const iconSrc = `https://openweathermap.org/img/w/${icon}.png`; //construct the icon URL
        const description = day.weather[0].description; //get the weather description

        return `
            <div class="forecast-day">
                <p class="day-name">${dayName}</p>
                <img src="${iconSrc}" alt="${description}" width="40" height="40">
                <p class="temp">${temp}&deg;C</p>
            </div>`;
    }).join('');

    forecastContainer.innerHTML = forecastHTML;
}

//call the functions
apiFetch();
fetchForecast();