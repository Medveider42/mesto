const openPopupBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

function togglePopUp () {
    popup.classList.toggle('.popup_opened');
}

openPopupBtn.addEventListener('click', togglePopUp);

console.log('profile__edit-button');