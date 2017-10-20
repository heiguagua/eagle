import Http from '../common/scripts/http.js';
import Encrypt from '../common/scripts/encrypt.js';
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    get() {
      const vm = this;
      Http.fetch({
          method: 'GET',
          url: Http.url.master + '/legal_case/list',
          data: {
            current: 1,
            pageSize: 10
          }
        })
        .then(function (result) {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            vm.list = data.body;
          }
        })
    }
  },
  mounted() {
    this.get();
  }
};
