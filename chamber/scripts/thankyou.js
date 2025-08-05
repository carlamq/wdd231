//get the parameters from the URL
const formInfo = new URLSearchParams(window.location.search);

document.querySelector('#form-data').innerHTML = `
    <p>Application for: ${formInfo.get('first-name')} ${formInfo.get('last-name')}</p>
    <p>Email: ${formInfo.get('email')}</p>
    <p>Phone: ${formInfo.get('phone')}</p>
    <p>Business Name: ${formInfo.get('business-name')}</p>
    <p>Submitted: ${formInfo.get('timestamp')}</p>
`;
