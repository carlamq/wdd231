//Use Local Storage
export function showVisitMessage() {
    const message = document.getElementById('visit-message');
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisitTours');

    if (!lastVisit) {
        message.textContent = "Welcome to our Tours page! Start exploring.";
    } else {
        const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (diffDays === 0) {
            message.textContent = "Welcome back! You were here earlier today.";
        } else {
            message.textContent = `You last visited ${diffDays} day${diffDays === 1 ? '' : 's'} ago.`;
        }
    }

    localStorage.setItem('lastVisitTours', now);
}
