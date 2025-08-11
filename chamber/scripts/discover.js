import { kashiwa } from "../data/discover.mjs"  
console.log(kashiwa);

// Get the container for the attraction cards
const discoverGrid = document.querySelector('.discover-grid');

// Loop through the attractions and create cards
function displayItems(kashiwa) {
    kashiwa.forEach(k => {

        //build the card element
        const thecard = document.createElement('div');
        //build the photo element
        const photo = document.createElement('img');
        photo.src = k.image;
        photo.alt = k.name;
        photo.loading = 'lazy';
        photo.width = 300;
        photo.height = 200;
        thecard.appendChild(photo);
        //build the title element
        const title = document.createElement('h2');
        title.innerText = k.name;
        thecard.appendChild(title);
        //build the address element
        const address = document.createElement('address');
        address.innerText = k.address;
        thecard.appendChild(address);
        //build the description element
        const description = document.createElement('p');
        description.innerText = k.description;
        thecard.appendChild(description);
        //add button
        const button = document.createElement('button');
        button.innerText = 'Learn More';
        button.classList.add('learn-more');
        button.type = 'button';
        thecard.appendChild(button);

        discoverGrid.appendChild(thecard);
    });
}
displayItems(kashiwa);

const sidebar = document.getElementById('sidebar-message');
const now = Date.now();
const lastVisit = localStorage.getItem('lastVisit');
if (!lastVisit) {
    sidebar.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
        sidebar.textContent = "Back so soon! Awesome!";
    } else {
        sidebar.textContent = `You last visited ${diffDays} day${diffDays === 1 ? '' : 's'} ago.`;
    }
}
localStorage.setItem('lastVisit', now);