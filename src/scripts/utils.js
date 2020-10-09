import {cards} from './const.js';
  export {appendCard};

function appendCard(card) {  //добавление карты в дом
  cards.prepend(card);
}  

