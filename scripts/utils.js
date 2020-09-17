import {userProfilePopup, userCardPopup, imagePopup, userNameInput, userProfessionInput,
  userName, userProfession, popupPhoto, popupTitle, cards, cardTitleInput, cardLinkInput} from './const.js';
  import {Card} from './Card.js';

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

function saveProfile(evt) {            // редактирование профайла 
  evt.preventDefault();
  userName.textContent  = userNameInput.value;
  userProfession.textContent  = userProfessionInput.value;
  togglePopup(userProfilePopup);
}

function saveCard(evt) {          // создание новой карты
  evt.preventDefault();
  const card = new Card(cardTitleInput.value, cardLinkInput.value);
  const cardElement = card.renderCard();
  appendCard(cardElement);
  togglePopup(userCardPopup);
}

function toggleUserProfilePopup() {           // Создание попапа профайла
  userNameInput.value = userName.textContent ;
  userProfessionInput.value = userProfession.textContent;
  togglePopup(userProfilePopup);
}

function toggleAddCardPopup() {     //  редактирование попапа добавления места - карты
  togglePopup(userCardPopup);
}

function toggleImagePopup(evt, imageTitle) {         //  Создание попапа картинки с описанием
  popupPhoto.src = evt.src;
  popupPhoto.alt = evt.alt;
  popupTitle.textContent = imageTitle;
  togglePopup(imagePopup);
}

export {togglePopup, toggleUserProfilePopup, toggleAddCardPopup, toggleImagePopup, appendCard,saveProfile, saveCard}