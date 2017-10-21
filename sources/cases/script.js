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
        code: '',
        current: 1,
        size: 10,
        total: 0,
      },
      options: [{
        key: 1,
        value: '已结案',
      }, {
        key: 0,
        value: '未结案',
      }],
      dialog: {
        show: false,
        case: {
          accuser: '',
          accused: '',
          code: '',
          reason: '',
          process: '',
          date: '',
        },
        options: [{
          key: 30,
          value: '小额诉讼程序',
        }, {
          key: 90,
          value: '简易程序',
        }, {
          key: 180,
          value: '普通程序',
        }],
        dataPickder: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        }
      }
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
            case_no: vm.search.code,
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
    httpSave() {
      const vm = this;
      vm.dialog.show = false;
      Http.fetch({
          method: 'POST',
          url: Http.url.master + '/legal_case/store',
          data: {
            accuser: vm.dialog.case.accuser,
            defendant: vm.dialog.case.accused,
            case_no: vm.dialog.case.code,
            case_brief: vm.dialog.case.reason,
            trial_term: vm.dialog.case.test,
            hearing_procedure: vm.dialog.process,
            accepted_date: vm.dialog.case.date,
            category: '民事一审',
            doc_type: '民事判决书',
            court_name: '四川省成都市武侯区人民法院',
          }
        })
        .then(function (result) {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            vm.httpGet();
            vm.$message({
              message: data.head.message
            });
          }
        })
    }
  },
  mounted() {
    const vm = this;
    vm.httpGet();
  }
};
