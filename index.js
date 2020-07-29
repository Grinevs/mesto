let editButton = document.querySelector('.profile__edit-button');
let popupLayer = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-icon');
let popupButtonSave = document.querySelector('.popup__form');

function openClosePopup() {
  if (popupLayer.classList.contains('popup_opened')) {
    popupLayer.classList.remove('popup_opened')
  } else {
    popupLayer.classList.add('popup_opened');
    document.querySelector('.popup__edit').value = document.querySelector('.profile__title').textContent;
    document.querySelector('.popup__edit:last-of-type').value = document.querySelector('.profile__subtitle').textContent;
  }
}

function saveInfo(evt) {
  let editTitleValue = document.querySelector('.popup__edit').value;
  let editSubTitleValue =  document.querySelector('.popup__edit:last-of-type').value;
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = editTitleValue;
  document.querySelector('.profile__subtitle').textContent = editSubTitleValue;
  openClosePopup()
}

popupButtonSave.addEventListener('submit', saveInfo);
editButton.addEventListener('click', openClosePopup);
popupCloseButton.addEventListener('click', openClosePopup);