import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupPhoto = document.querySelector('.popup_photo__pic');
    this._popupTitle = document.querySelector('.popup_photo__title');
    
  }

  open(cardSrc, imageTitle) {
    this._popupPhoto.src = cardSrc;
    this._popupTitle.textContent = imageTitle;
    super.open()
  }
}