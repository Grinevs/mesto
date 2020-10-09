import {FormValidator} from './FormValidator.js';

function enableValidation(listOfClasses) {
  const formList = Array.from(document.querySelectorAll(listOfClasses.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(formElement, listOfClasses);
    formValidator.enableValidation()
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__edit_type_error',
  errorClass: 'popup__error_visible'});




