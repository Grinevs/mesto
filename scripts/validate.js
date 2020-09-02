const hasInvalidInput = (inputList) => {      // проверка всей формы, для доступности кнопки
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, listOfClasses) => {   /// переключение стилей кнопки активная или нет
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(listOfClasses.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(listOfClasses.inactiveButtonClass);
    buttonElement.disabled = false; 
  }
}


const showInputError = (formElement, inputElement, errorMessage, listOfClasses) => {  // показывает ошибку в спане ниже
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(listOfClasses.errorClass); // незадействуются в данном проекте эти классы, это на будущее?
  inputElement.classList.add(listOfClasses.inputErrorClass);
};

const hideInputError = (formElement, inputElement, listOfClasses) => {  // скрывает ошибку в спане ниже
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(listOfClasses.errorClass);
  inputElement.classList.remove(listOfClasses.inputErrorClass);
  
};

const isValid = (formElement, inputElement, listOfClasses) => { //определяет валидность поля по очредности
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, listOfClasses);
  } else {
    hideInputError(formElement, inputElement, listOfClasses);
  }
};

const setEventListeners = (formElement, listOfClasses) => {            //  ставимм слушатей ко всем полям формы
  const inputList = Array.from(formElement.querySelectorAll(listOfClasses.inputSelector));  //
  const buttonElement = formElement.querySelector(listOfClasses.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, listOfClasses);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, listOfClasses);
      toggleButtonState(inputList, buttonElement, listOfClasses);
    });
  });
}

const reloadFormValidation = (evt, listOfClasses) => {    // перезапускает валидацию формы после сабмита
  evt.target.querySelectorAll(listOfClasses.inputSelector).forEach(item => {
    item.value='';
  })
  toggleButtonState(Array.from(evt.target.querySelectorAll(listOfClasses.inputSelector)), 
    evt.target.querySelector(listOfClasses.submitButtonSelector), listOfClasses);
}

const enableValidation = (listOfClasses) => {  // добавляет слушатели для форм и запускает функцию для слушателей елементов форм
  const formList = Array.from(document.querySelectorAll(listOfClasses.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      reloadFormValidation(evt, listOfClasses);
    });
    setEventListeners(formElement, listOfClasses);

  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__edit',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__edit_type_error',
  errorClass: 'popup__error_visible'
});
