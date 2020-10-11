export class Card {
  constructor(cardData, cardSelector, {handleCardClick}) {
      this._cardTitle = cardData.name;
      this._cardSrc = cardData.link;
      this._cardAlt = cardData.alt;
      this._likeButtonValue = cardData.likeButtonValue;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick
  }

  _createCard() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const card = cardTemplate.cloneNode(true);
    return card;
  }
  renderCard() {
    this._element = this._createCard();
    this._element.querySelector('.element__title').textContent = this._cardTitle;
    this._imageElement = this._element.querySelector('.element__img');
    this._imageElement.src = this._cardSrc;
    this._imageElement.alt = this._cardAlt;
    this._likeButton = this._element.querySelector('.element__like-button');  
    this._trashButton = this._element.querySelector('.element__recyclebin');
    this._setEventListeners(); 
    return this._element;
  }

  _likeClick() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _imgClick() {
    this._handleCardClick('.popup_photo', this._cardSrc, this._cardTitle);
  }

  _trashButtonClick() {
    const itemToDelete = this._trashButton.closest('.element');
      itemToDelete.remove();
      this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeClick();
    });
    this._imageElement.addEventListener('click', () => {
      this._imgClick();
    }); 
    this._trashButton.addEventListener('click', () => {
      this._trashButtonClick();
    });
  }
};




