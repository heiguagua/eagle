import Http from '../../../common/scripts/http';
import { message } from '../../../common/scripts/helper';
import Data from './script.vue.data';
import Methods from './script.vue.methods';
import Computed from './script.vue.computed';

export default {
  data() {
    return Data;
  },
  computed: Computed,
  methods: Methods,
  mounted() {
    // this.getTemplate();
  }
};
