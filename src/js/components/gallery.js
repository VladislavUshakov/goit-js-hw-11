import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export class Gallery {
  #lightbox;
  #itemsOnScreen;
  #itemsOnServer;
  #isMoreItems;

  constructor(id, renderMarkupFunction) {
    this.gallery = document.querySelector(id);
    this.#countItemsOnScreen();

    this.#lightbox = new SimpleLightbox(`${id} a`);
    this.renderMarkup = renderMarkupFunction;
  }

  set itemsOnServer(value) {
    this.#itemsOnServer = value;
  }

  get itemsOnServer() {
    return this.#itemsOnServer;
  }

  get isMoreItems() {
    return this.#isMoreItems;
  }

  addMarkup(data) {
    const markup = this.renderMarkup(data);
    this.gallery.insertAdjacentHTML('beforeend', markup);
    this.#countItemsOnScreen();
    this.#compareWithServerData();
    this.#lightbox.refresh();

    this.#autoScroll();
  }

  replaceMarkup(data) {
    const markup = this.renderMarkup(data);

    this.gallery.innerHTML = markup;
    this.#countItemsOnScreen();
    this.#compareWithServerData();
    this.#lightbox.refresh();
  }

  clear() {
    this.gallery.innerHTML = '';
    this.#countItemsOnScreen();
    this.#itemsOnServer = undefined;
  }

  #compareWithServerData() {
    if (this.#itemsOnScreen < this.#itemsOnServer) {
      this.#isMoreItems = true;
      return;
    }
    this.#isMoreItems = false;
  }

  #countItemsOnScreen() {
    this.#itemsOnScreen = this.gallery.childElementCount;
  }

  #autoScroll() {
    const { height: cardHeight } =
      this.gallery.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
