import Http from '../../../common/scripts/http';
import { message } from '../../../common/scripts/helper';

export default {
  generate() {
    const vm = this;
    sessionStorage.setItem('trial', JSON.stringify(vm.trial));
    vm.$router.push('/layout/trial/preview');
  },
  getTemplate() {
    const vm = this;
    const query = vm.$route.query;
    const param = vm.$route.params;
    console.log(param)
    Http.fetch({
        method: 'GET',
        url: Http.url.master + '/trialRecordTemplate',
        params: {
          case_brief: query.case_brief || '民间借贷纠纷',
          category: query.category || '民事一审',
          hearing_procedure: query.hearing_procedure || 'normal',
          write_type: param.write_type || 'section',
        }
      })
      .then(result => {
        const data = result.data;
        if (Http.protocol(data, 200)) {
          // vm.trial = data.body;
          return data
        } else {
          message(vm, 'warning', data.head.message);
        }
      });
  },
  logTrial() {
    console.log('Trial', this.trial);
  }
};
