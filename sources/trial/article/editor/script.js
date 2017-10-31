import Http from '../../../common/scripts/http';
import { message } from '../../../common/scripts/helper';

export default {
  data() {
    return {

    }
  },
  methods: {
    getTemplate() {
      const vm = this;
      const query = vm.$route.query;
      Http.fetch({
          method: 'GET',
          url: Http.url.master + '/trialRecordTemplate',
          params: {
            case_brief: query.case_brief || '民间借贷纠纷',
            category: query.category || '民事一审',
            hearing_procedure: query.hearing_procedure || 'normal',
            write_type: 'section',
          }
        })
        .then(function(result) {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            console.log(data)
            message(vm, 'info', data.head.message);
            return data
          } else {
            message(vm, 'warning', data.head.message);
          }
        })
        .then(function(data) {
          vm.$router.push('/layout/cases');
        });
    },
  },
  mounted() {
    // this.getTemplate();
  }
};
