export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _showError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    if (!isInputValid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);
    if (hasInvalidInput) {
      this._disableButton(this._submitButtonElement);
    } else {
      this._enableButton(this._submitButtonElement);
    }
}
  _disableButton(buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  _enableButton(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

enableValidation() {
    this._setEventListeners();
  }

}