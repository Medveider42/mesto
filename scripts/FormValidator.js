export default class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    _setEventListeners() {
        this._toggleButtonState(this._submitButtonElement);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState(this._submitButtonElement);
                this._checkInputValidity(inputElement);
            })
        });

    }

    _showError(inputElement) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;
    }

    _hideError(inputElement) {
        inputElement.classList.remove(this._config.inputErrorClass);
        this._errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        const isInputValid = inputElement.validity.valid;
        this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        if (!this._errorElement) return;

        if (!isInputValid) {
            this._showError(inputElement);
        } else {
            this._hideError(inputElement);
        }
    }

    _toggleButtonState() {
        const hasInvalidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);
        if (hasInvalidInput) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }
    _disableButton() {
        this._submitButtonElement.disabled = true;
        this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
    }

    _enableButton() {
        this._submitButtonElement.disabled = false;
        this._submitButtonElement.classList.remove(this._config.inactiveButtonClass);
    }

    enableValidation() {
        this._setEventListeners();
    }

}