import {editProfileButton, addCardButton, userProfilePopup, 
  userCardPopup, imagePopup, closeUserProfilePopupButton,
  closeAddCardPopupButton, closeImagePopupButton, saveProfileButton, 
  userName, userNameInput, userProfession, userProfessionInput, saveCardButton, 
  arrayOfPopups, cardTitleInput, cardLinkInput} from './const.js';

import {initialCards} from './initial-сards.js';
import {Card} from './Card.js';
import {togglePopup, toggleAddCardPopup, appendCard} from './utils.js'

function saveProfile(evt) {            // редактирование профайла 
  evt.preventDefault();
  userName.textContent  = userNameInput.value;
  userProfession.textContent  = userProfessionInput.value;
  togglePopup(userProfilePopup);
}

function saveCard(evt) {          // создание новой карты
  evt.preventDefault();
  const cardData = {name:cardTitleInput.value , link: cardLinkInput.value};
  const card = new Card(cardData, '#card');
  const cardElement = card.renderCard();
  appendCard(cardElement);
  cardTitleInput.value ='';
  cardLinkInput.value ='';
  togglePopup(userCardPopup);
}

function toggleUserProfilePopup() {           // Создание попапа профайла
  userNameInput.value = userName.textContent ;
  userProfessionInput.value = userProfession.textContent;
  togglePopup(userProfilePopup);
}

saveProfileButton.addEventListener('submit', saveProfile);   // слушатели кнопок
saveCardButton.addEventListener('submit', saveCard);
editProfileButton.addEventListener('click', toggleUserProfilePopup);
addCardButton.addEventListener('click', toggleAddCardPopup);
closeAddCardPopupButton.addEventListener('click',function() {
  togglePopup(userCardPopup)
});
closeUserProfilePopupButton.addEventListener('click',function() {
  togglePopup(userProfilePopup)
});
closeImagePopupButton.addEventListener('click',function() {
  togglePopup(imagePopup)
});

arrayOfPopups.forEach(function(popup) {                   // добавления слушатей попаов
  popup.addEventListener('mousedown',function(evt) {
    if (evt.target.classList.contains('popup')) {   
      togglePopup(evt.target)
    }
  })
})   

initialCards.forEach(function(item) {     
  const card = new Card(item, '#card')    //заполнение картами из коллекции
  const cardElement = card.renderCard();
  appendCard(cardElement);
}); 

