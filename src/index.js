import { PixabayApi } from './api/pixabayApi';

const refs = {
  searchForm: document.querySelector(`.search-form`),
  gallery: document.querySelector(`.gallery`),
  loadMoreBtn: document.querySelector(`.load-more`),
};

const apiService = new PixabayApi();

refs.searchForm.addEventListener('submit', searchHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreHandler);

async function searchHandler(e) {
  e.preventDefault();

  const currentQuery = e.target.elements.searchQuery.value.trim().toLowerCase();

  if (!currentQuery) {
    return;
  }

  if (currentQuery !== apiService.query) {
    apiService.query = currentQuery;
    apiService.page = 1;
    await apiService.getData();
    replaceMarkup(apiService.responseItems);
    refs.loadMoreBtn.classList.remove('is-hidden');
  }
}

async function loadMoreHandler(e) {
  e.preventDefault();
  e.target.blur();

  await apiService.getData();
  addMarkup(apiService.responseItems);
}

function addMarkup(data) {
  const markup = renderMarkup(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function replaceMarkup(data) {
  const markup = renderMarkup(data);

  refs.gallery.innerHTML = markup;
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
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
           <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
           <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>`;
    }
  );
  return markup;
}
