import '../pages/index.css';
import {editProfileButton, addCardButton,
  userNameInput,  userProfessionInput} from './const.js';

import {initialCards} from './initial-сards.js';
import {PopupWithForm} from './PopupWithForm.js';
import {PopupWithImage} from './PopupWithImage.js';
import {UserInfo} from './UserInfo.js';
import {Card} from './Card.js';
import {Section} from './Section.js';
import {appendCard} from './utils.js'

function toggleUserProfilePopup() {           // Создание попапа профайла
  const user = new UserInfo({userName: '.profile__title', userAbout: '.profile__subtitle'})
  userNameInput.value = user.getUserInfo().userName.textContent;
  userProfessionInput.value = user.getUserInfo().userAbout.textContent;
  const UserProfile = new PopupWithForm('.popup_profile', 
  {
    handleFormSubmit: (formValues) => {
    user.setUserInfo(formValues.title ,formValues.subtitle)
  }}
)
UserProfile.open()
UserProfile.setEventListeners();
}

function toggleAddCardPopup() {     //  редактирование попапа добавления места - карты
  const CardProfile = new PopupWithForm('.popup_card', 
  {
    handleFormSubmit: (formValues) => {
      const cardData = {name:formValues.title, link: formValues.subtitle};
      const card = new Card(cardData, '#card');
      const cardElement = card.renderCard();
      appendCard(cardElement); 
  }}
)
  CardProfile.open()
  CardProfile.setEventListeners();
}

editProfileButton.addEventListener('click', toggleUserProfilePopup);
addCardButton.addEventListener('click', toggleAddCardPopup);

const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => { 
    const card =  new Card(cardItem, '#card', {
      handleCardClick : (selector, src, title) => {const photoPopup = new PopupWithImage(selector, src, title);
      photoPopup.open()
      photoPopup.setEventListeners();}
    })  
    const cardElement = card.renderCard();
    cardList.addItem(cardElement);
  }
},
'.elements__list'
);

cardList.renderer(); 

