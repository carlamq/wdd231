const spotlightContainer = document.getElementById('spotlight-container');

//Obtain the members gold and silver randomly
async function getSpotlightMembers() {
    try {
        const response = await fetch('data/directory.json');
        if (response.ok) {
            const members = await response.json();

            //filter only gold and silver
            const goldSilverMembers = members.filter(member => member.membership_level === 3 || member.membership_level === 2);

            //get random
            const randomMembers = goldSilverMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = randomMembers.slice(0, 3);
            displaySpotlights(selectedMembers);
        }
        else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log( error);
    }
}

//show spotlight members
function displaySpotlights(members) {
    const spotlightHTML = members.map(member => {
        const level = member.membership_level === 3 ? 'Gold Member' : 'Silver Member';

        return `
            <div class="member-card spotlight">
                <img src="${member.image}" alt="${member.name}" loading="lazy" width="70" height="70"/>
                <h2>${member.name}</h2>
                <div class="name-jp">${member.name_jp || ''}</div>
                <div class="address">${member.address}</div>
                <div class="phone">${member.phone}</div>
                <a href="${member.website}" target="_blank">${member.website}</a>
                <div class="level">${level}</div>
                <div class="description">${member.description || ''}</div>
                <div class="industry"><em>${member.industry || ''}</em></div>
            </div>`;
    }).join('');
    spotlightContainer.innerHTML = spotlightHTML;
}

getSpotlightMembers();