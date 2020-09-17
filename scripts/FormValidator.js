export class FormValidator {
  constructor(formElement, listOfClasses) {
    this._formElement = formElement;
    this._listOfClasses = listOfClasses;
  }

  _setEventListeners(formElement) {   //ставимм слушатей ко всем полям формы
    this._inputList = Array.from(formElement.querySelectorAll(this._listOfClasses.inputSelector)); 
    this._buttonElement = formElement.querySelector(this._listOfClasses.submitButtonSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState();
    });
  });
  }

  _toggleButtonState() {   /// переключение стилей кнопки активная или нет
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._listOfClasses.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._listOfClasses.inactiveButtonClass);
      this._buttonElement.disabled = false; 
    }
  }

  _hasInvalidInput () {      // проверка всей формы, для доступности кнопки
    return this._inputList.some((inputElement) => {
      return !(inputElement.validity.valid);
    })
  };
  
  _isValid(inputElement) { //определяет валидность поля по очредности
    if (!(inputElement.validity.valid)) {
      this._showInputError(inputElement.validationMessage, inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

 _showInputError = (errorMessage, inputElement) => {  // показывает ошибку в спане ниже
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._listOfClasses.errorClass); // незадействуются в данном проекте эти классы, это на будущее?
    inputElement.classList.add(this._listOfClasses.inputErrorClass);
  };
  
  _hideInputError(inputElement) {  // скрывает ошибку в спане ниже
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._listOfClasses.errorClass);
    inputElement.classList.remove(this._listOfClasses.inputErrorClass);
  };
  
  _reloadFormValidation(evt)  {    // перезапускает валидацию формы после сабмита
    evt.target.querySelectorAll(this._listOfClasses.inputSelector).forEach(item => {
      item.value='';
    })
    this._toggleButtonState();
  }

  enableValidation(formElement) {  // добавляет слушатели для форм и запускает функцию для слушателей елементов форм
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._reloadFormValidation(evt);
      });
      this._setEventListeners(formElement);

  };
}