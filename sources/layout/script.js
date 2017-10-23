import Http from '../common/scripts/http';
import Encrypt from '../common/scripts/encrypt';
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    onSearch() {
      console.log('on Search!');
    },
    logout() {
      console.log('test');
    }
  }
};
