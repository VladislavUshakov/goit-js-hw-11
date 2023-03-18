export class Form {
  constructor(id, handlerFunc) {
    this.form = document.querySelector(id);

    this.form.addEventListener('submit', handlerFunc);
  }
}
