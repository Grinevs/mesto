const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupLayerProfile = document.querySelector('.popup_profile');
const popupLayerCard = document.querySelector('.popup_card');
const popupLayerPhoto = document.querySelector('.popup_photo');
const popupCloseButtonProfile = document.querySelector('.popup_profile__close-icon');
const popupCloseButtonCard = document.querySelector('.popup_card__close-icon');
const popupCloseButtonPhoto = document.querySelector('.popup_photo__close-icon');
const popupButtonSaveProfile = document.querySelector('.popup_profile__form');
const popupButtonSaveCard = document.querySelector('.popup_card__form');
const editTitleValueProfile = document.querySelector('.popup_profile__edit_place_first');
const editSubTitleValueProfile =  document.querySelector('.popup_profile__edit_place_second');
const editTitleValueCard = document.querySelector('.popup_card__edit_place_first');
const editSubTitleValueCard =  document.querySelector('.popup_card__edit_place_second');
const currentTitle = document.querySelector('.profile__title');
const currentSubTitle = document.querySelector('.profile__subtitle');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'горысо снегом'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'зимнее озеро'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'многоэтажки в один ряд'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'ключевская сопка'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'железная дорога'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'замерзшее озеро посреди скал'
  }
];

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.elements__list');

function createCard(cardTitle, cardSrc, cardAlt) {
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
    openClosePopup(eventTarget, imageTitle.textContent);
  });  
  trashButton.addEventListener('click', function() {
    const deleteItem = trashButton.closest('.element');
    deleteItem.remove();
  });
  cards.prepend(card);
}

initialCards.forEach(function(item) { 
  createCard(item.name , item.link, item.alt);
}); 

function openClosePopup(evt, imageTitle) {
  switch (true) {
    case (evt ===  undefined): 
      popupLayerCard.classList.remove('popup_opened');
      popupLayerProfile.classList.remove('popup_opened');
      popupLayerPhoto.classList.remove('popup_opened');
      break;
    case evt.classList.contains('profile__edit-button') :
      popupLayerProfile.classList.add('popup_opened');
      editTitleValueProfile.value = currentTitle.textContent ;
      editSubTitleValueProfile.value = currentSubTitle.textContent ;
      break;
    case evt.classList.contains('profile__add-button') :
      popupLayerCard.classList.add('popup_opened');
      break;
    case evt.classList.contains('element__img'):
      popupLayerPhoto.classList.add('popup_opened');
      document.querySelector('.popup_photo__pic').src = evt.src;
      document.querySelector('.popup_photo__title').textContent = imageTitle;
      break;
    default:
        popupLayerCard.classList.remove('popup_opened');
        popupLayerProfile.classList.remove('popup_opened');
        popupLayerPhoto.classList.remove('popup_opened');
    }
}

function saveInfo(evt) {
  evt.preventDefault();
  currentTitle.textContent  = editTitleValueProfile.value;
  currentSubTitle.textContent  = editSubTitleValueProfile.value;
  openClosePopup();
}

function saveInfoCard(evt) {
  evt.preventDefault();
  createCard(editTitleValueCard.value, editSubTitleValueCard.value);
  openClosePopup();
}

popupButtonSaveProfile.addEventListener('submit', saveInfo);

popupButtonSaveCard.addEventListener('submit', saveInfoCard);

editButton.addEventListener('click', function(evt) {
  const eventTarget = evt.target;
  openClosePopup(eventTarget)
});

addButton.addEventListener('click', function(evt) {
  const eventTarget = evt.target; 
  openClosePopup(eventTarget)
});

popupCloseButtonCard.addEventListener('click',function(evt) {
  const eventTarget = evt.target; 
  openClosePopup(eventTarget)
});

popupCloseButtonProfile.addEventListener('click',function(evt) {
  const eventTarget = evt.target;
  openClosePopup(eventTarget)
});

popupCloseButtonPhoto.addEventListener('click',function(evt) {
  const eventTarget = evt.target; 
  openClosePopup(eventTarget)
});