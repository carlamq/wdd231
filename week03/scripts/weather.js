const myTown = document.querySelector('#town');
const myGraphic = document.querySelector('#graphic');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');

const myLat = '49.75';
const myLon = '6.64';
const apiKey = 'a647ab6712884ca27e08a792af2730e6';

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${apiKey}&units=imperial&lang=en`;

// asinchronous function to fetch weather data
async function apiFetch() {
    try {
        // Fetch and store in variable response
        const response = await fetch(url);

        // Check if response is OK
        if (response.ok) {
            // Convert to JSON and store in variable data
            const data = await response.json();

            // Output to console for testing
            console.log(data);

            // Optional: call function to display data
            displayResults(data);
        } else {
            // Throw error using response.text()
            throw Error(await response.text());
        }
    } catch (error) {
        // Output errors from try to console
        console.log(error);
    }
}

function displayResults(data) {
    myTemperature.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    myGraphic.setAttribute('src', iconsrc);
    myGraphic.setAttribute('alt', desc);
    myDescription.textContent = `${desc}`;
}

// Call the function
apiFetch();