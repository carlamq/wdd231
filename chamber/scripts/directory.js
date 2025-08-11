const container = document.getElementById('directory-cards');
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

let currentMembers = [];//store the JSON data for dont do fetch again
container.className = 'grid'; //Set the CSS initial class to grid

gridButton.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
    renderMembers(currentMembers);
});

listButton.addEventListener("click", showList);

function showList() {
    container.classList.add("list");
    container.classList.remove("grid");
    renderMembers(currentMembers);
}

const fetchMembers = async () => {
    try {
        const response = await fetch('data/directory.json');//wait for the fetch to complete
        const members = await response.json();//wait for the response to be converted to JSON
        console.log(members);//output the members to the console
        currentMembers = members; // Store the fetched members
        renderMembers(members); // Render the members in the container
    } catch (error) {
        console.error('Error fetching members:', error);  //Handle any errors during fetch
        container.innerHTML = '<p>Error loading members.</p>';
    }
}

function levelLabel(level) {
    switch (level) {
        case 3: return 'Gold';
        case 2: return 'Silver';
        default: return 'Member';
    }
}

function renderMembers(members) {
    // ✅ Simplificar la lógica - ahora usar las clases CSS directamente
    if (container.classList.contains('grid')) {
        container.innerHTML = members.map(m =>
            `<div class="member-card">
                <img src="${m.image}" alt="${m.name}" loading="lazy" width="70" height="70"/>
                <h2>${m.name}</h2>
                <div>${m.name_jp}</div>
                <div>${m.address}</div>
                <div>${m.phone}</div>
                <a href="${m.website}" target="_blank">${m.website}</a>
                <div class="level">${levelLabel(m.membership_level)}</div>
                <div>${m.description || ''}</div>
                <div><em>${m.industry || ''}</em></div>
            </div>`
        ).join('');
    } else {
        container.innerHTML = members.map(m =>
            `<div class="member-card">
                <img src="${m.image}" alt="${m.name}" loading="lazy" width="50" height="50"/>
                <h2>${m.name}</h2>
                <span>${m.phone}</span>
                <span class="address">${m.address}</span>
                <a href="${m.website}" target="_blank">Website</a>
                <span class="level">${levelLabel(m.membership_level)}</span>
            </div>`
        ).join('');
    }
}

fetchMembers();