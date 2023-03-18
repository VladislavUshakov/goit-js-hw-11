export class Button {
  constructor(id, handlerFunc) {
    this.button = document.querySelector(id);

    this.button.addEventListener('click', handlerFunc);
  }

  hide() {
    this.button.classList.add('is-hidden');
  }

  show() {
    this.button.classList.remove('is-hidden');
  }
}
