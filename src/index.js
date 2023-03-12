import { PixabayApi } from './api/pixabayApi';

const refs = {
  searchForm: document.querySelector(`.search-form`),
  gallery: document.querySelector(`.gallery`),
  loadMoreBtn: document.querySelector(`.load-more`),
};

const apiService = new PixabayApi();

refs.searchForm.addEventListener('submit', async e => {
  e.preventDefault();

  apiService.query = e.target.elements.searchQuery.value;

  const res = await apiService.getData();
  console.log(res);
});

// refs.searchForm.addEventListener('submit', searchHandler);
// refs.loadMoreBtn.addEventListener('click', async e => {
//   try {
//     const res = await getData(params);

//     params.page += 1;
//     addMarkup(res.hits);
//     refs.loadMoreBtn.classList.remove('is-hidden');
//   } catch (error) {
//     console.log(error.message);
//   }
//   e.target.blur();
// });

// const params = {
//   q: '',
//   key: '34239282-bbeea62304f42d8ced9502c1f',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   page: 1,
//   per_page: 40,
// };

// async function searchHandler(e) {
//   e.preventDefault();

//   params.q = e.target.elements.searchQuery.value;

//   try {
//     const res = await getData(params);

//     params.page += 1;
//     addMarkup(res.hits);
//     refs.loadMoreBtn.classList.remove('is-hidden');
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function getData(params) {
//   const res = await axios.get(`https://pixabay.com/api/`, { params });
//   return res.data;
// }

// function addMarkup(data) {
//   const markup = renderMarkup(data);
//   refs.gallery.insertAdjacentHTML('beforeend', markup);
// }

// function renderMarkup(data) {
//   let markup = '';
//   data.map(
//     ({
//       webformatURL,
//       largeImageURL,
//       tags,
//       likes,
//       views,
//       comments,
//       downloads,
//     }) => {
//       markup += `
//       <div class="photo-card">
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>Likes ${likes}</b>
//           </p>
//           <p class="info-item">
//            <b>Views ${views}</b>
//           </p>
//           <p class="info-item">
//             <b>Comments ${comments}</b>
//           </p>
//           <p class="info-item">
//            <b>Downloads ${downloads}</b>
//           </p>
//         </div>
//       </div>`;
//     }
//   );
//   return markup;
// }
