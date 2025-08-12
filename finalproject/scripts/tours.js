let cachedTours = [];
const modalContainer = document.getElementById('tour-modal');
const toursContainer = document.getElementById('tours-container');

toursContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('details-btn')) {
        const index = e.target.dataset.index;
        displayTourDetails(cachedTours[index]);
    }
});

export async function loadTours() {
    try {
        const response = await fetch('data/tours.json');
        if (!response.ok) throw new Error(await response.text());

        cachedTours = await response.json();
        renderTours(cachedTours);
    } catch (error) {
        console.error('Error loading tours:', error);
        toursContainer.innerHTML = '<p>Error loading tours.</p>';
    }
}

function renderTours(tours) {
    toursContainer.innerHTML = tours.map((t, index) => `
        <div class="tour-card">
            <img src="${t.image}" alt="${t.name}" loading="lazy" width="300" height="200">
            <h3>${t.name}</h3>
            <p class="address">${t.address}</p>
            <p class="price"><strong>Price:</strong> ${t.price}</p>
            <button class="details-btn" data-index="${index}">More details</button>
            <a href="contact.html" class="reserve-btn">Reserve</a>
        </div>
    `).join('');
}

function displayTourDetails(tour) {
    modalContainer.innerHTML = `
        <button id="close-modal">❌</button> 
        <h2>${tour.name}</h2>
        <img src="${tour.image}" alt="${tour.name}" loading="lazy" width="300" height="200">
        <p class="price"><strong>Price for one person:</strong> ${tour.price}</p>
        <p>${tour.description}</p>
    `;
    modalContainer.showModal();

    // Save last viewed tour in localStorage
    localStorage.setItem('lastViewedTour', tour.name);

    document.getElementById('close-modal').addEventListener("click", () => {
        modalContainer.close();
    });
}

