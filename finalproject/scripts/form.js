document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('timestamp').value = new Date().toLocaleString('en-US');
});
//get the parameters from the URL
const formInfo = new URLSearchParams(window.location.search);

document.querySelector('#form-data').innerHTML = `
    <p>Message for: ${formInfo.get('first-name')} ${formInfo.get('last-name')}</p>
    <p>Email: ${formInfo.get('email')}</p>
    <p>Message: ${formInfo.get('message')}</p>
    <p>Submitted: ${formInfo.get('timestamp')}</p>
`;
