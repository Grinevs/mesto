const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const userProfilePopup = document.querySelector('.popup_profile');
const userCardPopup = document.querySelector('.popup_card');
const imagePopup = document.querySelector('.popup_photo');
const closeUserProfilePopupButton = document.querySelector('.popup_profile__close-icon');
const closeAddCardPopupButton = document.querySelector('.popup_card__close-icon');
const closeImagePopupButton = document.querySelector('.popup_photo__close-icon');
const saveProfileButton = document.querySelector('.popup_profile__form');
const saveCardButton = document.querySelector('.popup_card__form');
const userNameInput = document.querySelector('.popup_profile__edit_place_first');
const userProfessionInput =  document.querySelector('.popup_profile__edit_place_second');
const cardTitleInput = document.querySelector('.popup_card__edit_place_first');
const cardLinkInput =  document.querySelector('.popup_card__edit_place_second');
const userName= document.querySelector('.profile__title');
const userProfession = document.querySelector('.profile__subtitle');
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.elements__list');

function createCard(cardTitle, cardSrc='./images/elbrus.jpg', cardAlt='картинка красивого места') { // создание одной карты
  const card = cardTemplate.cloneNode(true);
  const likeButton = card.querySelector('.element__like-button');
  const trashButton = card.querySelector('.element__recyclebin');
  const imageElement = card.querySelector('.element__img');
  const imageTitle = card.querySelector('.element__title');
  imageElement.src = cardSrc;
  imageTitle.textContent = cardTitle;
  imageElement.alt = cardAlt;
  likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('element__like-button_active');
  });
  imageElement.addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    toggleImagePopup(eventTarget, imageTitle.textContent);
  });  
  trashButton.addEventListener('click', function() {
    const itemToDelete = trashButton.closest('.element');
    itemToDelete.remove();
  });
  cards.prepend(card);
}

initialCards.forEach(function(item) {         //заполнение картами из коллекции
  createCard(item.name, item.link, item.alt);
}); 

function togglePopup(evt) {                     // открытие и закрытие Попапов
  evt.classList.toggle('popup_opened')
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
  document.querySelector('.popup_photo__pic').src = evt.src;
  document.querySelector('.popup_photo__title').textContent = imageTitle;
  togglePopup(imagePopup);
}

function saveProfile(evt) {            // редактирование профайла 
  evt.preventDefault();
  userName.textContent  = userNameInput.value;
  userProfession.textContent  = userProfessionInput.value;
  togglePopup(userProfilePopup);
}

function saveCard(evt) {          // создание новой карты
  evt.preventDefault();
  createCard(cardTitleInput.value, cardLinkInput.value);
  togglePopup(userCardPopup);
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