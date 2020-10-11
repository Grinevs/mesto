import '../pages/index.css';
import '../images/favicon.png';
import {editProfileButton, addCardButton,
  userNameInput,  userProfessionInput} from './const.js';

import {initialCards} from './initial-сards.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {UserInfo} from './components/UserInfo.js';
import {Card} from './components/Card.js';
import {Section} from './components/Section.js';
import {FormValidator} from './components/FormValidator.js';

const user = new UserInfo({userName: '.profile__title', userAbout: '.profile__subtitle'}) 

function toggleUserProfilePopup() {   
  userNameInput.value = user.getUserInfo().userName;
  userProfessionInput.value = user.getUserInfo().userAbout;
  const userProfile = new PopupWithForm('.popup_profile', 
  {
    handleFormSubmit: (formValues) => {
    user.setUserInfo(formValues.title ,formValues.subtitle)
  }}
)
userProfile.open()
userProfile.setEventListeners();
}

function toggleAddCardPopup() {     //  редактирование попапа добавления места - карты
  const cardProfile = new PopupWithForm('.popup_card', 
  {
    handleFormSubmit: (formValues) => {
      const cardData = {name:formValues.title, link: formValues.subtitle};
      const card = new Card(cardData, '#card', {
        handleCardClick : (selector, src, title) => {const photoPopup = new PopupWithImage(selector);
        photoPopup.open(src, title);
        photoPopup.setEventListeners();}
      });
      const cardElement = card.renderCard();
      cardList.addItem(cardElement);
  }}
)
  cardProfile.open()
  cardProfile.setEventListeners();
}

const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => { 
    const card =  new Card(cardItem, '#card', {
      handleCardClick : (selector, src, title) => {const photoPopup = new PopupWithImage(selector);
      photoPopup.open(src, title);
      photoPopup.setEventListeners();}
    })  
    const cardElement = card.renderCard();
    cardList.addItem(cardElement);
  }
},
'.elements__list'
);

cardList.renderedItems(); 


function enableValidation(listOfClasses) {
  const formList = Array.from(document.querySelectorAll(listOfClasses.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, listOfClasses);
    formValidator.enableValidation()
  });
}

editProfileButton.addEventListener('click', toggleUserProfilePopup);
addCardButton.addEventListener('click', toggleAddCardPopup);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__edit_type_error',
  errorClass: 'popup__error_visible'});




