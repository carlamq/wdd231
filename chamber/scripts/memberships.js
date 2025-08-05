// Membership information
const membershipData = [
    {
        id: 'np',
        title: 'NP Membership',
        price: 'FREE',
        description: 'For Non-Profit Organizations',
        benefits: [
            'Basic directory listing',
            'Access to networking events',
            'Monthly newsletter',
            'Community support resources'
        ]
    },
    {
        id: 'bronze',
        title: 'Bronze Membership',
        price: '$50/month',
        description: 'Basic Business Benefits',
        benefits: [
            'Everything in NP Membership',
            'Enhanced directory listing',
            'Business referral services',
            '10% discount on events',
            'Basic business consultation'
        ]
    },
    {
        id: 'silver',
        title: 'Silver Membership',
        price: '$100/month',
        description: 'Enhanced Business Support',
        benefits: [
            'Everything in Bronze Membership',
            'Featured directory listing',
            'Monthly spotlight opportunity',
            '20% discount on events',
            'Priority customer support',
            'Advanced business workshops'
        ]
    },
    {
        id: 'gold',
        title: 'Gold Membership',
        price: '$200/month',
        description: 'Premium Business Partnership',
        benefits: [
            'Everything in Silver Membership',
            'Premium directory placement',
            'Weekly spotlight opportunities',
            '50% discount on all events',
            'Dedicated account manager',
            'Exclusive VIP events access',
            'Co-marketing opportunities'
        ]
    }
];

const cardsContainer = document.getElementById('membership-info');
const modalContainer = document.getElementById('modals-info');

// Function to create membership cards
function createMembershipCards() {
    cardsContainer.innerHTML = membershipData.map((membership, index) => `
        <div class="membership-card">
            <h3>${membership.title}</h3>
            <p class="price">${membership.price}</p>
            <p>${membership.description}</p>
            <button class="info-btn" data-index="${index}">Learn More</button>
        </div>
    `).join('');
}

// Function to show membership details
function displayMembershipDetails(membership) {
    modalContainer.innerHTML = `
        <button id="closeModal">❌</button>
        <h2>${membership.title}</h2>
        <p class="price">${membership.price}</p>
        <p>${membership.description}</p>
        <h3>Benefits:</h3>
        <ul>
            ${membership.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
    `;
    modalContainer.showModal();
    
    document.getElementById('closeModal').addEventListener("click", () => {
        modalContainer.close();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createMembershipCards();

    //open modal
    cardsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('info-btn')) {
            const index = e.target.dataset.index;
            displayMembershipDetails(membershipData[index]);
        }
    });

    //close the modal anywhere
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.close();
        }
    });
});