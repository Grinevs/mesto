import '../pages/index.css';
import '../images/favicon.png';
import {editProfileButton, addCardButton,
  userNameInput,  userProfessionInput, editAvatarImg} from './const.js';

import {PopupWithForm} from './components/PopupWithForm.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {UserInfo} from './components/UserInfo.js';
import {Card} from './components/Card.js';
import {Section} from './components/Section.js';
import {FormValidator} from './components/FormValidator.js';
import {Api} from './components/Api.js';

const configApi = {url: 'https://mesto.nomoreparties.co/v1/cohort-16' ,
  headers: {authorization: '070b2a82-6a1e-49d9-8bec-07436830ab2d', 'Content-Type': 'application/json'}
}
const user = new UserInfo({userName: '.profile__title',
  userAbout: '.profile__subtitle',
  avatar: '.profile__avatar'}) 
  
const api = new Api(configApi);
export let ownerId  

api.getUserProfile()
  .then((getUser) => {
    user.setUserInfo(getUser.name ,getUser.about, getUser.avatar)
    ownerId = getUser._id  
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  }); 


function renderLoading(status, selector) {
  if (status) {
    document.querySelector(selector).innerHTML = 'Сохрание...'
  }
  else {
    document.querySelector(selector).innerHTML = 'Сохранить'
  }
}

const userProfile = new PopupWithForm('.popup_profile', 
{
  handleFormSubmit: (formValues) => {
  renderLoading(true, '.popup_profile__button')
  api.editUserProfile({name: formValues.title, about: formValues.subtitle})
    .then(() => {
      user.setUserInfo(formValues.title, formValues.subtitle, editAvatarImg.src )
   })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
  })
    .finally(()=>{
      renderLoading(false, '.popup_profile__button')
  }); 
  
}}
)

userProfile.setEventListeners();

function editUserProfilePopup() {   
  userNameInput.value = user.getUserInfo().userName;
  userProfessionInput.value = user.getUserInfo().userAbout;
  userProfile.open()
}

const userProfileAvatar = new PopupWithForm('.popup_avatar', 
  {
    handleFormSubmit: (formValues) => {
    renderLoading(true, '.popup_avatar__button')
    api.editUserAvatar({avatar: formValues.subtitle})
      .then(() => {
        user.setUserAvatar(formValues.subtitle)
     })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
     })
      .finally(()=>{
        userProfileAvatar.close()
        renderLoading(false, '.popup_avatar__button')
  });  
  }}
)

userProfileAvatar.setEventListeners(); 

function editAvatar() {
 userProfileAvatar.open()
}

const photoPopup = new PopupWithImage('.popup_photo');
photoPopup.setEventListeners();

let cardIdToDelete          
let itemToDeleleteDOM

const popupDelete = new PopupWithForm('.popup_delete', {
  handleFormSubmit: () => {
    api.deleteCard(cardIdToDelete)
    .then(() => {
      itemToDeleleteDOM.remove()
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })
    .finally(() => {
      popupDelete.close()
    }); 
    }
});

popupDelete.setEventListeners();

function createCard(cardData) {
   const card = new Card(cardData, '#card', {
    handleCardClick : (selector, src, title) => {
      photoPopup.open(src, title);}  
  }, 
  {
    deleteButtonClick: (itemToDelete, cardId) => {
      cardIdToDelete =cardId;
      itemToDeleleteDOM = itemToDelete
      popupDelete.open();
    }
  },
  {
    handleLikeClick: () => {
      if (card.checkLike()) {
        api.removeLike(cardData._id)
        .then((data) => {
          cardData.countLikes = ((data.likes).length)
          cardData.likes.pop(ownerId)
          card.updateLike(cardData.countLikes)
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        }); 
        } else { 
          api.addLike(cardData._id)
          .then((data) => {
            cardData.countLikes = ((data.likes).length)
            cardData.likes.push(ownerId) 
            card.updateLike(cardData.countLikes)
          })
          .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
      });
        }
      } 
    }
  );
  return card
}

let cardListGlobal

const cardProfile = new PopupWithForm('.popup_card', 
  {
    handleFormSubmit: (formValues) => {
      renderLoading(true, '.popup_card__button')
      const cardData = {name:formValues.title, link: formValues.subtitle}; 
      api.addNewCard(cardData)
      .then((data) => {
        cardData.countLikes=0;
        cardData.owner= {};
        cardData.owner._id = ownerId;
        cardData.liked = false
        cardData.likes = [];
        cardData._id = data._id;
        return createCard(cardData);
      })
      .then((card) => {
        const newCardElement =card.renderCard()
        cardListGlobal.addItem(newCardElement, false);
        })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
        })
      .finally(()=>{
        cardProfile.close()
        renderLoading(false, '.popup_card__button')
    });   
  }}
) 
cardProfile.setEventListeners();

function addCardPopup()  { //  редактирование попапа добавления места - карты
  cardProfile.open()
}

api.getInitialCards()
.then((cardsInit) => {
  const cardList = new Section({
    data: cardsInit,
    renderer: (cardItem) => {
      const arrayOfLikes =cardItem.likes;
      const checkArray = arrayOfLikes.map((item)=> item._id)
      if (checkArray.includes(ownerId)) {
        cardItem.liked = true
      } else {cardItem.liked = false}
      cardItem.countLikes = (arrayOfLikes).length;
      const cardElement = createCard(cardItem).renderCard();
      cardList.addItem(cardElement, true);
    }
  },
  '.elements__list'
  ); 
  cardListGlobal = cardList
  cardList.renderedItems(); 
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
}); 

function enableValidation(listOfClasses) { // валидация
  const formList = Array.from(document.querySelectorAll(listOfClasses.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, listOfClasses);
    formValidator.enableValidation()
  });
}

editProfileButton.addEventListener('click', editUserProfilePopup);
addCardButton.addEventListener('click', addCardPopup);
editAvatarImg.addEventListener('click', editAvatar);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__edit_type_error',
  errorClass: 'popup__error_visible'});


  
