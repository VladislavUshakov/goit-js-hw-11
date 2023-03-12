const axios = require('axios/dist/browser/axios.cjs');

const params = {
  q: '',
  key: '34239282-bbeea62304f42d8ced9502c1f',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};

export class PixabayApi {
  constructor() {
    this.params = params;
    this.responseItems = [];
  }

  set query(text) {
    this.params.q = text;
  }

  get query() {
    return this.params.q;
  }

  set page(number) {
    this.params.page = number;
  }

  get res() {
    return this.responseItems;
  }

  async getData() {
    try {
      const res = await axios.get(`https://pixabay.com/api/`, {
        params: this.params,
      });

      this.params.page += 1;
      this.responseItems = res.data.hits;
    } catch (error) {
      this.params.page = 1;
      this.responseItems = [];
      console.log(error);
    }
  }
}
