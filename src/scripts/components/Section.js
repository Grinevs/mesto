export class Section {
  constructor({data , renderer}, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderedItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  addItem(element, append) {
    if (append) { 
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

}