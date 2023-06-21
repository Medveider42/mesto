import Card from './Card.js';
import FormValidator from './FormValidator.js';
import  {initialCards, config} from './InitialCards.js';


const popupElement = document.querySelectorAll('.popup_opened');
const profileEditPopup = document.querySelector('.popup_edit');
const cardAddPopup = document.querySelector('.popup_add');
const photoPopup = document.querySelector('.popup_big-image');
const photoPopupImage = document.querySelector('.popup__image');
const photoPopupTitle = photoPopup.querySelector('.popup__figcaption');

// открытие попапов
const profileEditPopupBtn = document.querySelector('.profile__edit-button');
const cardAddPopupBtn = document.querySelector('.profile__add-button');

//формы
const profileFormElement = profileEditPopup.querySelector('.popup__container');
const cardFormElement = cardAddPopup.querySelector('.popup__container');

//инпуты
const nameInput = document.querySelector('.popup__field-name');
const jobInput = document.querySelector('.popup__field-about');
const cardNameInput = cardAddPopup.querySelector('.popup__field-name');
const photoLinkInput = cardAddPopup.querySelector('.popup__field-about');

//значения профайла
const profileName = document.querySelector('.profile__name');
const job = document.querySelector('.profile__about');

// шаблон карточек
const cardTemplate = document.getElementById('#cardTemplate');
const cardsContainer = document.querySelector('.elements');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);    
};

//закрытие всех крестиков
const crossBttn = document.querySelectorAll('.popup__close-bttn');
crossBttn.forEach(escButton => {
    const buttonPopup = escButton.closest('.popup');
    escButton.addEventListener('click', () => closePopup(buttonPopup));
    });

profileEditPopupBtn.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = job.textContent;
    openPopup(profileEditPopup);
});

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(profileEditPopup);
}

function addCardFormSubmitHandler(evt) {
    evt.preventDefault();
    createCard(cardNameInput.value, photoLinkInput.value);    
    cardFormElement.reset();
    this._disabledBttn(evt.submitter, configFormSelector);
    cardsContainer.prepend(createCard(Card));   
    closePopup(cardAddPopup);
}

cardAddPopupBtn.addEventListener('click', function () {
    openPopup(cardAddPopup);
});

export function handleOpenPhotoPopup(name, link) {
    photoPopupImage.src = link;
    photoPopupImage.alt = name;
    photoPopupTitle.textContent = name;
    openPopup(photoPopup);
};

function createCard(item) {
    const card = new Card(item, cardTemplate);
    return card.generateCard();
}

initialCards.forEach(function (item) {
    cardsContainer.append(createCard(item));
    
});

profileFormElement.addEventListener('submit', handleEditProfileFormSubmit);
cardFormElement.addEventListener('submit', addCardFormSubmitHandler);


//закрытие esc
function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
        evt.preventDefault();
    }
};

//закрытие оверлей
const popups  = document.querySelectorAll('.popup');
[...popups].forEach((popupElement) => {
    popupElement.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popupElement);
      }
    })
});

const popupProfileFormValidator = new FormValidator(config, profileFormElement);
popupProfileFormValidator.enableValidation();

const popupAddCardFormValidator = new FormValidator(config, cardFormElement);
popupAddCardFormValidator.enableValidation();
