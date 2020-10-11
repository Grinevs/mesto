import {popupPhoto, popupTitle} from '../const.js';
import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    
  }

  open(cardSrc, imageTitle) {
    popupPhoto.src = cardSrc;
    popupTitle.textContent = imageTitle;
    super.open()
  }
}