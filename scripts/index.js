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
const cardTemplate = document.getElementById('cardTemplate').content;
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
    renderCard(cardNameInput.value, photoLinkInput.value);    
    cardFormElement.reset();
    disabledBttn(evt.submitter, configFormSelector);    
    closePopup(cardAddPopup);    
}

cardAddPopupBtn.addEventListener('click', function () {
    openPopup(cardAddPopup);
});

function handleOpenPhotoPopup(name, link) {
    photoPopupImage.src = link;
    photoPopupImage.alt = name;
    photoPopupTitle.textContent = name;
    openPopup(photoPopup);
};

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