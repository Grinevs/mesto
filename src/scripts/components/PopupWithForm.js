import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._bindSubmitThis = this._formSubmit.bind(this);
    this._element = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.popup__edit');
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }
  setEventListeners() {
    this._element.addEventListener('submit', this._bindSubmitThis) 
    super.setEventListeners();                                   
  }

  close() {
    this._element.removeEventListener('submit', this._bindSubmitThis) 
    this._element.reset();
    super.close()
  }
}