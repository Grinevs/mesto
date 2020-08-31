const hasInvalidInput = (inputList) => {      // проверка всей формы, для доступности кнопки
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, obj) => {   /// переключение стилей кнопки активная или нет
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const showInputError = (formElement, inputElement, errorMessage, obj) => {  // показывает ошибку в спане ниже
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass); // незадействуются в данном проекте эти классы, это на будущее?
  inputElement.classList.add(obj.inputErrorClass);
};

const hideInputError = (formElement, inputElement, obj) => {  // скрывает ошибку в спане ниже
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(obj.errorClass);
  inputElement.classList.remove(obj.inputErrorClass);
  
};

const isValid = (formElement, inputElement, obj) => { //определяет валидность поля по очредности
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

const setEventListeners = (formElement, obj) => {            //  ставимм слушатей ко всем полям формы
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));  //
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, obj);
  const buttonProfile = saveProfileButton.querySelector('.popup__button');
  buttonProfile.classList.remove(obj.inactiveButtonClass); // делаем активной кнопку при загрузке
  buttonProfile.disabled = false;
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
}

const enableValidation = (obj) => {  // добавляет слушатели для форм и запускает функцию для слушателей елементов форм
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, obj);
    
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
