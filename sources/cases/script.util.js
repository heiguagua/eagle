import Http from '../common/scripts/http.js';

export default {
  query: (params) => {
    return Http.fetch({
      method: 'GET',
      url: Http.url.master + '/legal_case/list',
      params: params
    })
  },
  create: (data) => {
    return Http.fetch({
      method: 'POST',
      url: Http.url.master + '/legal_case/store',
      data: data
    })
  }
};
