const openPopupBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-bttn');

function togglePopUp() {
    popup.classList.toggle('popup_opened');
}

openPopupBtn.addEventListener('click', togglePopUp);
popupCloseBtn.addEventListener('click', togglePopUp);

let formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__field-name');
const jobInput = document.querySelector('.popup__field-about');
const Name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__about');
nameInput.value = Name.textContent;
jobInput.value = job.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    Name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);