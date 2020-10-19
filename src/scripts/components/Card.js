
export class Card {
  constructor(cardData, cardSelector, {handleCardClick}, {deleteButtonClick}, {handleLikeClick}) {
      this._cardTitle = cardData.name;
      this._cardSrc = cardData.link;
      this._likes = cardData.countLikes;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._trashButtonClick = deleteButtonClick;
      this._trashEnabled = (cardData.owner._id === 'c0e8feee4dd762daf7635941') ? true : false;
      this._cardId = cardData._id;
      this._handleLikeClick = handleLikeClick
      this._liked = cardData.liked;
      
    
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
    this._likeButton = this._element.querySelector('.element__like-button'); 
    this._element.querySelector('.element__likes').textContent = this._likes;
    this._likeButtonValue = this._element.querySelector('.element__likes') 
    if (this._liked == true) {this._likeButton.classList.add('element__like-button_active')}
    this._trashButton = this._element.querySelector('.element__recyclebin');
    if  (this._trashEnabled)  {
      this._trashButton.style.display = "block"
    } else { 
      this._trashButton.style.display = "none"
    }
    this._setEventListeners(); 
    return this._element;
  }

  setLike(likes) {
    this.likes = likes
  }

  _likeClick() {
    this._handleLikeClick(this._cardId)
    if (this._likeButton.classList.contains('element__like-button_active')) {
      this._likeButton.classList.remove('element__like-button_active');
      this._likes = this._likes - 1;
      this._likeButtonValue.textContent = this._likes;
    } else {this._likeButton.classList.add('element__like-button_active');
      this._likes = this._likes + 1;
      this._likeButtonValue.textContent = this._likes;
  }
     
  }

  _imgClick() {
    this._handleCardClick('.popup_photo', this._cardSrc, this._cardTitle);
  }

  // _trashButtonClick(itemToDelete, cardId) {
  //     itemToDelete.remove();
  //     this._element = null;
  // }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeClick();
    });
    this._imageElement.addEventListener('click', () => {
      this._imgClick();
    }); 
    this._trashButton.addEventListener('click', () => {
      const itemToDelete = this._trashButton.closest('.element');
      const cardId = this._cardId;
      this._trashButtonClick(itemToDelete, cardId);
    });
  }
};




