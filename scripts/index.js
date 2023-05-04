//попап
const popup = document.querySelector('.popup');
const EditProfilePopUp = document.querySelector('.popup_edit');
const AddCardPopup = document.querySelector('.popup_add');
const openEditPopupBtn = document.querySelector('.profile__edit-button');
const closeEditPopup = EditProfilePopUp.querySelector('.popup__close-bttn');
const AddCardCloseBtn = AddCardPopup.querySelector('.popup__close-bttn');

//формы
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__field-name');
const jobInput = document.querySelector('.popup__field-about');
const Name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__about');

// открытие- закрытие новой карточки
const OpenAddPopupBtn = document.querySelector('.profile__add-button');
const AddCardPopupSaveBtn = AddCardPopup.querySelector('.popup__save-bttn');

//форма создания новой карты//
const AddCardForm = AddCardPopup.querySelector('.popup__container');
const CardNameInput = AddCardPopup.querySelector('.popup__field-name');
const PhotoLinkInput = AddCardPopup.querySelector('.popup__field-about');
const CardName = document.querySelector('.element__title');

//открытие фоток
const photoPopUp = document.querySelector('.popup_big-image');
const photoPopUpImage = document.querySelector('.popup__image');
const photoPopupCloseBtn = photoPopUp.querySelector('.popup__close-bttn');
const photoPopUpTitle = photoPopUp.querySelector('.popup__figcaption');

function togglePopUp(popup) {
    popup.classList.toggle('popup_opened');
};

closeEditPopup.addEventListener('click', function () {
    togglePopUp(EditProfilePopUp);
});

openEditPopupBtn.addEventListener('click', function () {
    nameInput.value = Name.textContent;
    jobInput.value = job.textContent;
    togglePopUp(EditProfilePopUp);
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    Name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    togglePopUp(EditProfilePopUp);
}

formElement.addEventListener('submit', handleFormSubmit);

const saveinfo = EditProfilePopUp.querySelector('.popup__save-bttn');
saveinfo.addEventListener('click', handleFormSubmit);

// шаблон карточек
const CardTemplate = document.getElementById('cardTemplate').content;
const CardsContainer = document.querySelector('.elements');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

formElement.addEventListener('submit', handleFormSubmit);

function AddCardFormSubmitHandler(evt) {
    evt.preventDefault();
    renderCard(CardNameInput.value, PhotoLinkInput.value);
    togglePopUp(AddCardPopup);
};

OpenAddPopupBtn.addEventListener('click', function () {
    togglePopUp(AddCardPopup);
});

AddCardCloseBtn.addEventListener('click', function () {
    togglePopUp(AddCardPopup);
});

AddCardForm.addEventListener('submit', AddCardFormSubmitHandler);
AddCardPopupSaveBtn.addEventListener('click', AddCardFormSubmitHandler);

initialCards.forEach(function (item) {
    renderCard(item.name, item.link)
});

function OpenPhotoPopup(item, name, link) {
    item.addEventListener('click', function () {
        photoPopUpImage.src = link;
        photoPopUpImage.alt = name;
        photoPopUpTitle.textContent = name;
        togglePopUp(photoPopUp);
    })
};

photoPopupCloseBtn.addEventListener('click', function () {
    togglePopUp(photoPopUp);
});

function createCard(name, link) {
    const cardElement = CardTemplate.querySelector('.element').cloneNode(true);

    const cardPhoto = cardElement.querySelector('.element__photo');
    const cardTitle = cardElement.querySelector('.element__title');
    const cardLikeBtn = cardElement.querySelector('.element__like');
    cardLikeBtn.addEventListener('click', handleLike);
    const cardDeleteBtn = cardElement.querySelector('.element__delete');
    cardDeleteBtn.addEventListener('click', handleDelete);
    cardTitle.textContent = name;
    cardPhoto.src = link;
    cardPhoto.alt = name;
    OpenPhotoPopup(cardPhoto, name, link);
    return cardElement;
};

function renderCard(name, link) {
    const card = createCard(name, link);
    CardsContainer.prepend(card);
};

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