const year = document.querySelector("#currentYear");
const today = new Date();
year.innerHTML = `${today.getFullYear()}`;

document.getElementById("lastModified").innerHTML = document.lastModified;

// Set timestamp
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('timestamp').value = new Date().toLocaleString('en-US');
});