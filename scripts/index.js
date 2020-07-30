let editButton = document.querySelector('.profile__edit-button');
let popupLayer = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-icon');
let popupButtonSave = document.querySelector('.popup__form');
let editTitleValue = document.querySelector('.popup__edit_place_first');
let editSubTitleValue =  document.querySelector('.popup__edit_place_second');
let currentTitle = document.querySelector('.profile__title');
let currentSubTitle = document.querySelector('.profile__subtitle');

function openClosePopup() {
  if (popupLayer.classList.contains('popup_opened')) {
    popupLayer.classList.remove('popup_opened')
  } else {
    popupLayer.classList.add('popup_opened');
    editTitleValue.value = currentTitle.textContent ;
    editSubTitleValue.value = currentSubTitle.textContent ;
  }
}

function saveInfo(evt) {
  evt.preventDefault();
  currentTitle.textContent  = editTitleValue.value;
  currentSubTitle.textContent  = editSubTitleValue.value;
  openClosePopup();
}

popupButtonSave.addEventListener('submit', saveInfo);
editButton.addEventListener('click', openClosePopup);
popupCloseButton.addEventListener('click', openClosePopup);
