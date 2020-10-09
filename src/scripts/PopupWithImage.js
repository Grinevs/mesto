import {popupPhoto, popupTitle} from './const.js';
import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, cardSrc, imageTitle) {
    super(popupSelector)
    this._cardSrc = cardSrc;
    this._imageTitle = imageTitle
  }

  open() {
    popupPhoto.src = this._cardSrc;
    popupTitle.textContent = this._imageTitle;
    super.open()
  }
}