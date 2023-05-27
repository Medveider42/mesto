function showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
}

function checkInputValidity(inputElement, formElement, config) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    if (!errorElement) return;

    if (!isInputValid) {
        showError(inputElement, errorElement, config)
    } else {
        hideError(inputElement, errorElement, config)
    }
}

function disabledBttn(buttonElement, config) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
}

function enabledBttn(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
}

function toggleBttnState(buttonElement, isActive, config) {
    if (!isActive) {
        disabledBttn(buttonElement, config)
    } else {
        enabledBttn(buttonElement, config)
    }
}

function setEventListener(formElement, config) {
    const inputLists = formElement.querySelectorAll(config.inputSelector);
    const submitBttnElement = formElement.querySelector(config.submitButtonSelector);

    toggleBttnState(submitBttnElement, formElement.checkValidity(), config);
    
    [...inputLists].forEach((inputItem) => {
        inputItem.addEventListener('input', () => {
            checkInputValidity(inputItem, formElement, config);
            toggleBttnState(submitBttnElement, formElement.checkValidity(), config);
        })
    })
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    [...forms].forEach((formItem) => {
        setEventListener(formItem, config);
    })
}

const configFormSelector = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-bttn',
    inactiveButtonClass: 'popup__save-bttn_disabled',
    inputErrorClass: 'popup__input_invalid',
};

enableValidation(configFormSelector)