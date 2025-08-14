const spotlightContainer = document.getElementById('spotlight-container');
const spotlightContainerContact = document.getElementById('spotlight-container-contact');

//Using Fetch API
async function getSpotlightTours() {
    try {
        const response = await fetch('data/tours.json');
        if (response.ok) {
            const tours = await response.json();

            //Using Filter Array Method
            const bestsellerTours = tours.filter(tour => tour.bestseller === true);

            displaySpotlights(bestsellerTours);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error loading tours:', error);
    }
}

function displaySpotlights(tours) {
    const spotlightHTML = tours.map(t => {
        return `
            <div class="spotlight-card">
                <img src="${t.image}" alt="${t.name}" loading="lazy" width="300" height="200">
                <h3>${t.name}</h3>
                <p class="address">${t.address}</p>
                <p class="price"><strong>Price:</strong> ${t.price}</p>
                <p>${t.description}</p>
            </div>
        `;
    }).join('');

    if (spotlightContainer) {
        spotlightContainer.innerHTML = spotlightHTML;
    }

    if (spotlightContainerContact) {
        spotlightContainerContact.innerHTML = spotlightHTML;
    }
}

getSpotlightTours();
