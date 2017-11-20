import Http from '../common/scripts/http.js';
import Encrypt from '../common/scripts/encrypt.js';
import { message, storage } from '../common/scripts/helper';

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  mounted() {
    const token = storage.get("token");
    if (token && token !== "") {
      storage.remove("token");
    }
  },
  methods: {
    login() {
      const vm = this;
      Http.fetch({
          method: 'post',
          url: Http.url.master + '/login',
          data: {
            loginName: vm.username,
            password: Encrypt.md5(vm.password)
          }
        })
        .then(function(result) {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            Encrypt.token.set(data.head.token); // Set token
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
    onEnter() {
      this.login();
    }
  }
};
