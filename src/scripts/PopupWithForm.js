import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSubmit = this._formSubmit.bind(this);
  }

  _getInputValues() {
    this._element = this._popup.querySelector('.popup__form');
    this._inputList = this._element.querySelectorAll('.popup__edit');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }
  setEventListeners() {
    this._element = this._popup.querySelector('.popup__form');
    this._element.addEventListener('submit', this._formSubmit)
    super.setEventListeners();
  }

  close() {
    this._element.removeEventListener('submit', this._formSubmit)
    this._element.reset();
    super.close()
  }
}