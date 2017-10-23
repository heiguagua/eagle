import Http from '../common/scripts/http';
import Encrypt from '../common/scripts/encrypt';
export default {
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    search() {
      console.log('search!');
    },
    logout() {
      console.log('logout');
    }
  }
};
