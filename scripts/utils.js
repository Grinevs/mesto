import {userCardPopup, imagePopup, popupPhoto, popupTitle, cards} from './const.js';
  export {togglePopup, toggleAddCardPopup, toggleImagePopup, appendCard};

function documentListener(popup) {
  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', keyEventSwitcher)
  } else {
      document.removeEventListener('keydown', keyEventSwitcher)
  }
}

function keyEventSwitcher(evt) {  // определяет события
  if (evt.key === 'Escape') {  
    const popupOpened = document.querySelector('.popup_opened');
    togglePopup(popupOpened);
  } 
}

function togglePopup(popup) {     // открытие и закрытие Попапов 
  popup.classList.toggle('popup_opened');
  documentListener(popup);
}

function appendCard(card) {  //добавление карты в дом
  cards.prepend(card);
}  

function toggleAddCardPopup() {     //  редактирование попапа добавления места - карты
  togglePopup(userCardPopup);
}

function toggleImagePopup(cardSrc, imageTitle) {         //  Создание попапа картинки с описанием
  popupPhoto.src = cardSrc;
  popupTitle.textContent = imageTitle;
  togglePopup(imagePopup);
}

