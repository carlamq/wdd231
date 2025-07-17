const container = document.getElementById('directory-cards');
const listBtn = document.getElementById('list-view');
let gridView = true; // control the actual view mode
// Initialize the view mode to grid

let currentMembers = [];//store the JSON data for dont do fetch again
container.className = 'grid'; //Set the CSS initial class to grid

listBtn.addEventListener('click', () => {
    gridView = !gridView; //change true to false and vice versa
    container.className = gridView ? 'grid' : 'list'; //Control what CSS class to use
    listBtn.textContent = gridView ? 'View as a List' : 'View as Grid'; //change the text in the button
    renderMembers(currentMembers);//reender with the same HTML but different CSS
});

const fetchMembers = async () => {
    try {
        const response = await fetch('scripts/directory.json');//wait for the fetch to complete
        const members = await response.json();//wait for the response to be converted to JSON
        console.log(members);//output the members to the console
        currentMembers = members; // Store the fetched members
        renderMembers(members); // Render the members in the container
    } catch (error) {
        console.error('Error fetching members:', error);  //Handle any errors during fetch
        container.innerHTML = '<p>Error loading members.</p>';
    }
}

function renderMembers(members) {
    if (gridView) {
        container.innerHTML = members.map(m =>
            `<div class="member-card">
                <img src="${m.image}" alt="${m.name}" loading="lazy"/>
                <h2>${m.name}</h2>
                <div class="jp">${m.name_jp}</div>
                <div>${m.address}</div>
                <div>${m.phone}</div>
                <a href="${m.website}" target="_blank">${m.website}</a>
                <div class="level">${levelLabel(m.membership_level)}</div>
                <div>${m.description}</div>
                <div><em>${m.industry}</em></div>
            </div>`
        ).join('');//<div><em>${m.industry || ''}</em></div> can use in case that the array is long and do not contain some elements, can be null too
    } else {
        container.innerHTML = members.map(m =>//map for run for every element in the array
            `<div class="member-card list-info">
                <img src="${m.image}" alt="${m.name}" loading="lazy"/>
                <h2>${m.name}</h2>
                <span>${m.phone}</span>
                <span class="address">${m.address}</span>
                <a href="${m.website}" target="_blank">Website</a>
                <span class="level">${levelLabel(m.membership_level)}</span>
            </div>`
        ).join('');
    }
}

function levelLabel(level) {
    switch (level) {
        case 3: return 'Gold Member';
        case 2: return 'Silver Member';
        default: return 'Member';
    }
}

fetchMembers();