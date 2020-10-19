import '../pages/index.css';
import '../images/favicon.png';
import {editProfileButton, addCardButton,
  userNameInput,  userProfessionInput, editAvatarImg, ownerId, popupButton} from './const.js';

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
const user = new UserInfo({userName: '.profile__title', userAbout: '.profile__subtitle', avatar: '.profile__avatar'}) 
const api = new Api(configApi);

function renderLoading(status) {
  if (status) {
    popupButton.innerText = 'Сохрание...'
  }
  else {
    popupButton.innerText = 'Сохранить'
  }
}

function toggleUserProfilePopup() {   
  
  userNameInput.value = user.getUserInfo().userName;
  userProfessionInput.value = user.getUserInfo().userAbout;
  editAvatarImg.src = user.getUserInfo().avatar;
  const userProfile = new PopupWithForm('.popup_profile', 
  {
    handleFormSubmit: (formValues) => {
      renderLoading(true)
     api.editUserProfile({name: formValues.title, about: formValues.subtitle})
     .then(() => {
      user.setUserInfo(formValues.title, formValues.subtitle, editAvatarImg.src )
     })
     .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    }); 
    
  }}
)
renderLoading(false)
userProfile.open()
userProfile.setEventListeners();
}

function editAvatar() {
  const userProfile = new PopupWithForm('.popup_avatar', 
  {
    handleFormSubmit: (formValues) => {
      renderLoading(true)
     api.editUserAvatar({avatar: formValues.subtitle})
     .then(() => {
      user.setUserAvatar(formValues.subtitle)
     })
     .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    }); 
    
  }}
)
renderLoading(false)
userProfile.open()
userProfile.setEventListeners(); 
}



function toggleAddCardPopup() {   //  редактирование попапа добавления места - карты
  
  const cardProfile = new PopupWithForm('.popup_card', 
  {
    handleFormSubmit: (formValues) => {
      renderLoading(true)
      const cardData = {name:formValues.title, link: formValues.subtitle}; 
      api.addNewCard(cardData)
      .then((data) => {
        cardData.countLikes=0;
        cardData.owner= {};
        cardData.owner._id = ownerId;
        cardData.liked = false
        cardData.likes = [];
        cardData._id = data._id;
        return new Card(cardData, '#card', {
          handleCardClick : (selector, src, title) => {
          const photoPopup = new PopupWithImage(selector);
          photoPopup.open(src, title);
          photoPopup.setEventListeners();} 
        }, 
        {
          deleteButtonClick: (itemToDelete, cardId) => {
              const popupDelete = new PopupWithForm('.popup_delete', {
                handleFormSubmit: () => {
                  api.deleteCard(cardId)
                  .then(() => {
                    itemToDelete.remove()
                  })
                  .catch((err) => {
                    console.log('Ошибка. Запрос не выполнен: ', err);
                  }); 
                }
              });
              popupDelete.open();
              popupDelete.setEventListeners();
          }},
          {
            handleLikeClick: () => {
              const arrOfLikes = cardData.likes;
            if (arrOfLikes.includes(ownerId)) {
              api.removeLike(cardData._id)
              .then((data) => {
                cardData.countLikes = ((data.likes).length)
                cardData.likes.pop(ownerId)
              })
              .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
              }); } else { 
                api.addLike(cardData._id)
                .then((data) => {
                  cardData.countLikes = ((data.likes).length)
                  cardData.likes.push(ownerId) 
                })
                .catch((err) => {
                  console.log('Ошибка. Запрос не выполнен: ', err);
            });
              }
            } 
          }
        );
      })
      .then((card) => {
          const cardElement = card.renderCard();
          const cardList = new Section({data: cardElement}, '.elements__list')
          cardList.addItem(cardElement, false);
        })
      .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        }); 
  }}
) 
 renderLoading(false)
  cardProfile.open()
  cardProfile.setEventListeners();
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
      const card =  new Card(cardItem, '#card', {
        handleCardClick : (selector, src, title) => {
          const photoPopup = new PopupWithImage(selector);
          photoPopup.open(src, title);
          photoPopup.setEventListeners();
      }}, {
        deleteButtonClick: (itemToDelete, cardId) => {
          const popupDelete = new PopupWithForm('.popup_delete', {
            handleFormSubmit: () => {
              api.deleteCard(cardId)
              .then(() => {
                itemToDelete.remove()
              })
              .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
              }); 
            }
          });
          popupDelete.open();
          popupDelete.setEventListeners();
        }},{
          handleLikeClick: (cardId) => { 
            
            let newArrOfOwners = []
              for (let i= 0; i < cardsInit.length-1; i++) {
                if (cardsInit[i]._id === cardId) {
                  newArrOfOwners = cardsInit[i].likes;
                }
              }
              const arrOfLikes = newArrOfOwners.map((item) => item._id)
            if (arrOfLikes.includes(ownerId)) {
              api.removeLike(cardId)
              .then((data) => {
                card.setLike((data.likes).length)
                api.getInitialCards().then((data) => {cardsInit = data})
                .catch((err) => {
                  console.log('Ошибка. Запрос не выполнен: ', err);
            });
              })
              .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
              }); } else { 
                api.addLike(cardId)
                .then((data) => {
                  card.setLike((data.likes).length)
                  api.getInitialCards().then((data) => {cardsInit = data})
                  .catch((err) => {
                  console.log('Ошибка. Запрос не выполнен: ', err);
            });
                })
                .catch((err) => {
                  console.log('Ошибка. Запрос не выполнен: ', err);
            });
              }
          } 
        }
        )
      const cardElement = card.renderCard();
      cardList.addItem(cardElement, true);
    }
  },
  '.elements__list'
  ); 
  cardList.renderedItems(); 
})
.catch((err) => {
  console.log('Ошибка. Запрос не выполнен: ', err);
}); 

api.getUserProfile()
  .then((getUser) => {
    user.setUserInfo(getUser.name ,getUser.about, getUser.avatar)
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

editProfileButton.addEventListener('click', toggleUserProfilePopup);
addCardButton.addEventListener('click', toggleAddCardPopup);
editAvatarImg.addEventListener('click', editAvatar);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__edit_type_error',
  errorClass: 'popup__error_visible'});


  

  