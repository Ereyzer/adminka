import axios from 'axios';

class ApiService {
  constructor({ baseUrl }) {
    this.BASE_URL = baseUrl;
  }

  postElements(data1) {
    console.log(data1);
    return axios({
      method: 'post',
      url: this.BASE_URL,
      data: {
        data: data1,
      },
    });
  }

  getElements() {
    // return fetch('https://dry-beyond-52848.herokuapp.com/')
    //   .then(r => console.log(r))
    //   .catch(console.log);
    console.log('get');
    return axios
      .get(this.BASE_URL)
      .then(r => r)
      .catch(console.log);
  }
}

export default ApiService;
