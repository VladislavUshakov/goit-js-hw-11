import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { PixabayApi } from './js/api/pixabayApi';
import { Button } from './js/components/button';
import { Form } from './js/components/form';
import { Gallery } from './js/components/gallery';
import { Validator } from './js/services/validation';

const apiService = new PixabayApi({
  key: '34239282-bbeea62304f42d8ced9502c1f',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});
const validationService = new Validator();

const refs = {
  searchForm: new Form('.search-form', searchHandler),
  gallery: new Gallery('.gallery', renderMarkup),
  loadMoreBtn: new Button('.load-more', loadMoreHandler),
};

const requestParams = {
  q: '',
  page: 1,
};

async function searchHandler(e) {
  e.preventDefault();
  refs.loadMoreBtn.hide();

  const currentQuery = e.target.elements.searchQuery.value;
  const valid = validationService.validation(currentQuery, requestParams.q);

  if (!valid) {
    return;
  }

  let isMoreElementsOnServer = null;

  requestParams.q = currentQuery;
  requestParams.page = 1;

  const response = await sendRequest(requestParams);

  refs.gallery.itemsOnServer = response.totalHits;

  if (totalHitsHandler(response.totalHits)) return;

  refs.gallery.replaceMarkup(response.hits);

  if (lastItemHandler()) return;

  refs.loadMoreBtn.show();
}

async function loadMoreHandler(e) {
  e.preventDefault();

  refs.loadMoreBtn.hide();

  requestParams.page += 1;

  const response = await sendRequest(requestParams);

  refs.gallery.addMarkup(response.hits);

  if (lastItemHandler()) return;

  refs.loadMoreBtn.show();
}

function renderMarkup(data) {
  let markup = '';
  data.forEach(
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

async function sendRequest(requestParams) {
  try {
    return await apiService.getData(requestParams);
  } catch (error) {
    console.log(error);
  }
}

function lastItemHandler() {
  if (!refs.gallery.isMoreItems) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    return true;
  }
}

function totalHitsHandler(quantity) {
  if (quantity === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    refs.gallery.clear();
    return true;
  } else {
    Notify.success(`Hooray! We found ${quantity} images.`);
    return false;
  }
}
