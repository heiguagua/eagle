import Http from '../common/scripts/http.js';
import Encrypt from '../common/scripts/encrypt.js';
export default {
  data() {
    return {
      list: [],
      search: {
        name: '',
        status: '',
        reason: '',
        number: '',
        current: 1,
        size: 10,
        total: 0,
      },
      options: [{
        key: 1,
        value: "已结案",
      }, {
        key: 0,
        value: "未结案",
      }],
    }
  },
  methods: {
    // pagination
    changeCurrentPage(currentPage) {
      const vm = this;
      if (currentPage && typeof currentPage === 'number') {
        vm.search.current = currentPage;
        vm.httpGet();
      }
    },
    changePageSize(size) {
      const vm = this;
      if (size && typeof size === 'number') {
        vm.search.size = size;
        vm.httpGet();
      }
    },
    // http
    httpGet() {
      const vm = this;
      Http.fetch({
          method: 'GET',
          url: Http.url.master + '/legal_case/list',
          params: {
            current: vm.search.current,
            pageSize: vm.search.size,
            closure_flag: vm.search.status,
            case_brief: vm.search.reason,
            case_no: vm.search.number,
            parties: vm.search.name,
          }
        })
        .then(function (result) {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            vm.list = data.body;
            vm.search.total = data.head.total;
            vm.$message({
              message: data.head.message || 'search!'
            });
          }
        })
    },
  },
  mounted() {
    const vm = this;
    vm.httpGet();
  }
};
