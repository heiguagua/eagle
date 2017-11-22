import Http from '../../../common/scripts/http';
import { message, storage } from '../../../common/scripts/helper';
import TrialEditor from './editor/index.vue';

export default {
  data() {
    return {};
  },
  components: {
    TrialEditor
  },
  methods: {
    logTrial() {
      console.info('Trial', this.$store.state.Trial.trial);
    },
    generate() {
      const vm = this;
      const editorTrial = this.$store.state.Trial.trial;
      storage.set('trial', editorTrial);
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
  },
  mounted() {},
  directives: {}
};
