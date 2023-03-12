const axios = require('axios/dist/browser/axios.cjs');

export class PixabayApi {
  constructor() {
    this.params = {
      q: '',
      key: '34239282-bbeea62304f42d8ced9502c1f',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 40,
    };
  }

  // For tests
  //   set query(text) {
  //     this.params.q = text;
  //   }

  get query() {
    return this.params.q;
  }

  set page(number) {
    this.params.page = number;
  }

  async getData() {
    try {
      const res = await axios.get(`https://pixabay.com/api/`, {
        params: this.params,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
