const axios = require('axios/dist/browser/axios.cjs');

export class PixabayApi {
  constructor(params = {}) {
    this.params = params;
  }

  async getData(outsideParams) {
    const res = await axios.get(`https://pixabay.com/api/`, {
      params: {
        ...this.params,
        ...outsideParams,
      },
    });
    return res.data;
  }
}

// const reqParams = {
//   q: '',
//   key: '34239282-bbeea62304f42d8ced9502c1f',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   page: 1,
//   per_page: 40,
// };

// export class PixabayApi {
//   constructor() {
//     this.reqParams = reqParams;
//     this.resElements = [];
//     this.totalElements = null;
//   }

//   set query(text) {
//     this.reqParams.q = text;
//   }

//   get query() {
//     return this.reqParams.q;
//   }

//   set page(number) {
//     this.reqParams.page = number;
//   }

//   async getData() {
//     try {
//       const res = await axios.get(`https://pixabay.com/api/`, {
//         params: this.reqParams,
//       });

//       this.reqParams.page += 1;
//       this.resElements = res.data.hits;
//       this.totalElements = res.data.totalHits;
//     } catch (error) {
//       this.reset();
//       console.log(error);
//     }
//   }

//   reset() {
//     this.reqParams.page = 1;
//     this.resElements = [];
//     this.totalElements = null;
//   }
// }
