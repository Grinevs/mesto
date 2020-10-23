import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._bindSubmitThis = this._formSubmit.bind(this); 
    this._formElement = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.popup__edit');
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());

  }
  setEventListeners() {
    this._formElement.addEventListener('submit', this._bindSubmitThis) 
    super.setEventListeners();                                   
  }

  close() {
    this._formElement.reset();
    super.close()
  }
}