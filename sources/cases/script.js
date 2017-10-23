import Http from '../common/scripts/http.js';
import Encrypt from '../common/scripts/encrypt';
import UtilCases from './script.util';
import {
  message
} from '../common/scripts/helper';

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
        },
        validator: {
          accuser: [{
            required: true,
            message: '请输入原告信息',
            trigger: 'change'
          }],
          accused: [{
            required: true,
            message: '请输入被告信息',
            trigger: 'change'
          }],
          code: [{
            required: true,
            message: '请输入案号信息',
            trigger: 'change'
          }],
          reason: [{
            required: true,
            message: '请输入案由信息',
            trigger: 'change'
          }],
          process: [{
            required: true,
            message: '请选择适用程序',
            trigger: 'change'
          }],
          date: [{
            required: true,
            message: '请选择受理日期',
            trigger: 'change'
          }]
        }
      }
    }
  },
  computed: {

  },
  methods: {
    // pagination
    changeCurrentPage(currentPage) {
      const vm = this;
      if (currentPage && typeof currentPage === 'number') {
        vm.search.current = currentPage;
        vm.httpSearch();
      }
    },
    changePageSize(size) {
      const vm = this;
      if (size && typeof size === 'number') {
        vm.search.size = size;
        vm.httpSearch();
      }
    },
    // http
    httpSearch() {
      const vm = this;
      UtilCases.query({
          current: vm.search.current,
          pageSize: vm.search.size,
          closure_flag: vm.search.status,
          case_brief: vm.search.reason,
          case_no: vm.search.code,
          parties: vm.search.name,
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            vm.list = data.body;
            vm.search.total = data.head.total;
            message(vm, 'info', data.head.message);
          } else {
            message(vm, 'warning', data.head.message);
          }
        })
    },
    httpSave() {
      const vm = this;
      vm.dialog.show = false;
      UtilCases.create({
          accuser: vm.dialog.case.accuser,
          defendant: vm.dialog.case.accused,
          case_no: vm.dialog.case.code,
          case_brief: vm.dialog.case.reason,
          hearing_procedure: vm.dialog.process,
          accepted_date: vm.dialog.case.date,
          category: '民事一审',
          doc_type: '民事判决书',
          court_name: '四川省成都市武侯区人民法院',
        })
        .then(result => {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            vm.httpSearch();
          }
        })
    }
  },
  mounted() {
    const vm = this;
    // init cases list
    UtilCases.query()
      .then((result) => {
        const data = result.data;
        vm.list = data.body;
        vm.search.total = data.head.total;
      })
  }
};
