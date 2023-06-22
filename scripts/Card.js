import {handleOpenPhotoPopup} from './index.js';

export default class Card {
    constructor(data, selector) {
        this._name = data.name;        
        this._link = data.link;
        this._selector = selector;  
    }

_getTemplate() {
    const cardTemplate = document
    .querySelector(this._selector)
    .content.querySelector('.element')
    .cloneNode(true);

    return cardTemplate;
}
  
generateCard() {
        this._cardElement = this._getTemplate();    
        this._cardPhoto = this._cardElement.querySelector('.element__photo');
        this._cardTitle = this._cardElement.querySelector('.element__title');
        this._cardTitle.textContent = this._name;
        this._cardPhoto.src = this._link;
        this._cardPhoto.alt =  this._name;
        this._cardLikeBtn = this._cardElement.querySelector('.element__like');        
        this._cardDeleteBtn = this._cardElement.querySelector('.element__delete');
        this._setEventListeners();
    
        return this._cardElement;
    };    


// удаление карточки
_handleDelete(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.element').remove();
};

// лайк карточки
_handleLike(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like_active');
};

_handlePhotoPopupClick() {
    handleOpenPhotoPopup(this._cardTitle, this._cardPhoto);
}

_setEventListeners() {
    this._cardLikeBtn.addEventListener('click', this._handleLike);
    this._cardDeleteBtn.addEventListener('click', this._handleDelete);
    this._cardPhoto.addEventListener('click', () => handleOpenPhotoPopup(this._link, this._name));
}

}

