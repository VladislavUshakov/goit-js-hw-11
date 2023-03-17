import { PixabayApi } from './api/pixabayApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector(`.search-form`),
  gallery: document.querySelector(`.gallery`),
  loadMoreBtn: document.querySelector(`.load-more`),
};

const apiService = new PixabayApi();
const lightbox = new SimpleLightbox('.gallery a');

let isEndElement = null;

refs.searchForm.addEventListener('submit', searchHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreHandler);

async function searchHandler(e) {
  e.preventDefault();

  const validationStatus = queryValidation(e);

  if (!validationStatus) {
    return;
  }

  apiService.reset();
  await apiService.getData();

  if (apiService.resElements.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');

    return;
  }

  Notify.success(`Hooray! We found ${apiService.totalElements} images.`);

  replaceMarkup(apiService.resElements);

  isEndElement = checkOfEndElement();
  if (isEndElement) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );

    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }

  refs.loadMoreBtn.classList.remove('is-hidden');
}

async function loadMoreHandler(e) {
  e.preventDefault();

  refs.loadMoreBtn.classList.add('is-hidden');

  await apiService.getData();

  addMarkup(apiService.resElements);

  isEndElement = checkOfEndElement();
  if (isEndElement) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );

    return;
  }

  refs.loadMoreBtn.classList.remove('is-hidden');
}

function addMarkup(data) {
  const markup = renderMarkup(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

  autoScroll();
}

function replaceMarkup(data) {
  const markup = renderMarkup(data);

  refs.gallery.innerHTML = markup;
  lightbox.refresh();
}

function renderMarkup(data) {
  let markup = '';
  data.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      markup += `
      <a href="${largeImageURL}" class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes <span>${likes}</span></b>
          </p>
          <p class="info-item">
            <b>Views <span>${views}</span></b>
          </p>
          <p class="info-item">
            <b>Comments <span>${comments}</span></b>
          </p>
          <p class="info-item">
            <b>Downloads <span>${downloads}</span></b>
          </p>
        </div>
      </a>`;
    }
  );
  return markup;
}

function queryValidation(e) {
  const currentQuery = e.target.elements.searchQuery.value.trim().toLowerCase();
  const { q: previousQuery } = apiService.reqParams;

  if (currentQuery != '' && currentQuery != previousQuery) {
    apiService.reqParams.q = currentQuery;

    return true;
  }

  return false;
}

function checkOfEndElement() {
  const quantityGalleryEls = refs.gallery.childElementCount;
  const { totalElements } = apiService;

  if (quantityGalleryEls === totalElements) {
    return true;
  }

  return false;
}

function autoScroll() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
