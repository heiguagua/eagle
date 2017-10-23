import Http from '../common/scripts/http';
import UtilCases from './script.util';
import DataCases from './script.vue.data';
import MethodCases from './script.vue.methods';
import {
  message
} from '../common/scripts/helper';

export default {
  data() {
    return DataCases
  },
  methods: MethodCases,
  mounted() {
    const vm = this;
    /* Init cases list */
    UtilCases.query()
      .then(result => {
        const data = result.data;
        if (Http.protocol(data, 200)) {
          vm.list = data.body;
          vm.search.total = data.head.total;
        } else {
          message(vm, 'warning', data.head.message);
        }
      })
  }
};
