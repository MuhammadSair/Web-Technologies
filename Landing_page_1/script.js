const form = document.getElementById("registration-form");
const username = document.getElementById("Fname");
const address = document.getElementById("saddress");
const city = document.getElementById("city");
const state = document.getElementById("state");
const zip = document.getElementById("zip");

const setError = (element, message) => {
    // Assuming you have a div with class 'error' for each input to display error message
    const errorDisplay = element.parentElement.querySelector('.error');
    errorDisplay.innerText = message;
    element.classList.add('error');
};

const setSuccess = element => {
    const errorDisplay = element.parentElement.querySelector('.error');
    errorDisplay.innerText = '';
    element.classList.remove('error');
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();
    const stateValue = state.value.trim();
    const zipValue = zip.value.trim();

    if(usernameValue === '') {
        setError(username, 'First name is required');
    } else {
        setSuccess(username);
    }

    if(addressValue === '') {
        setError(address, 'Address is required');
    } else {
        setSuccess(address);
    }

    if(cityValue === '') {
        setError(city, 'City is required');
    } else {
        setSuccess(city);
    }

    if(stateValue === '') {
        setError(state, 'State is required');
    } else {
        setSuccess(state);
    }

    if(zipValue === '') {
        setError(zip, 'Zip code is required');
    } else {
        setSuccess(zip);
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
});