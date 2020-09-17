import {editProfileButton, addCardButton, userProfilePopup, userCardPopup, imagePopup, closeUserProfilePopupButton,
  closeAddCardPopupButton, closeImagePopupButton, saveProfileButton, saveCardButton, arrayOfPopups} from './const.js';

import {initialCards} from './initial-сards.js';
import {Card} from './Card.js';
import {togglePopup, toggleUserProfilePopup, toggleAddCardPopup, appendCard, saveProfile, saveCard} from './utils.js'


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
  const card = new Card(item.name, item.link, item.alt)    //заполнение картами из коллекции
  const cardElement = card.renderCard();
  appendCard(cardElement);
}); 

