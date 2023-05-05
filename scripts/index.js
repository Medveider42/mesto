//попап
const profileEditPopup = document.querySelector('.popup_edit');
const cardAddPopup = document.querySelector('.popup_add');
const photoPopup = document.querySelector('.popup_big-image');
const photoPopupImage = document.querySelector('.popup__image');
const photoPopupTitle = photoPopup.querySelector('.popup__figcaption');

// открытие- закрытие попапов
const profileEditPopupBtn = document.querySelector('.profile__edit-button');
const popupEditClose = profileEditPopup.querySelector('.popup__close-bttn');
const cardAddCloseBtn = cardAddPopup.querySelector('.popup__close-bttn');
const photoPopupCloseBtn = photoPopup.querySelector('.popup__close-bttn');
const cardAddPopupBtn = document.querySelector('.profile__add-button');
const cardAddSaveBtn = cardAddPopup.querySelector('.popup__save-bttn');
const profileInfoSave = profileEditPopup.querySelector('.popup__save-bttn');

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
import {initialCards} from "./cards.js";

const cardTemplate = document.getElementById('cardTemplate').content;
const cardsContainer = document.querySelector('.elements');

function openPopup(popup) {
    popup.classList.add('popup_opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

popupEditClose.addEventListener('click', function () {
    closePopup(profileEditPopup);
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
    renderCard(cardNameInput.value, photoLinkInput.value);
    closePopup(cardAddPopup);
    cardFormElement.reset();
}

cardAddPopupBtn.addEventListener('click', function () {
    openPopup(cardAddPopup);    
});

cardAddCloseBtn.addEventListener('click', function () {
     closePopup(cardAddPopup);
});

function handleOpenPhotoPopup(name, link) {
    photoPopupImage.src = link;
    photoPopupImage.alt = name;
    photoPopupTitle.textContent = name;
    openPopup(photoPopup);
};

photoPopupCloseBtn.addEventListener('click', function () {
    closePopup(photoPopup);
});

function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    const cardPhoto = cardElement.querySelector('.element__photo');
    const cardTitle = cardElement.querySelector('.element__title');
    const cardLikeBtn = cardElement.querySelector('.element__like');
    cardLikeBtn.addEventListener('click', handleLike);
    const cardDeleteBtn = cardElement.querySelector('.element__delete');
    cardDeleteBtn.addEventListener('click', handleDelete);
    cardTitle.textContent = name;
    cardPhoto.src = link;
    cardPhoto.alt = name;

    cardPhoto.addEventListener('click', () => handleOpenPhotoPopup(name, link));

    return cardElement;
};

function renderCard(name, link) {
    const card = createCard(name, link);
    cardsContainer.prepend(card);
};

initialCards.forEach(function (item) {
    renderCard(item.name, item.link)
});

profileFormElement.addEventListener('submit', handleEditProfileFormSubmit);
cardFormElement.addEventListener('submit', addCardFormSubmitHandler);

profileInfoSave.addEventListener('click', handleEditProfileFormSubmit);
cardAddSaveBtn.addEventListener('click', addCardFormSubmitHandler);

// удаление карточки
function handleDelete(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.element').remove();
};

// лайк карточки
function handleLike(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_active');
};