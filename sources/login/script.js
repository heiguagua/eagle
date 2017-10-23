import Http from '../common/scripts/http.js';
import Encrypt from '../common/scripts/encrypt.js';
import {
  message
} from '../common/scripts/helper';

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onLogin() {
      const vm = this;
      Http.fetch({
          method: 'post',
          url: Http.url.master + '/login',
          data: {
            loginName: vm.username,
            password: Encrypt.md5(vm.password)
          }
        })
        .then(function (result) {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            message(vm, 'info', data.head.message);
            return data
          } else {
            message(vm, 'warning', data.head.message);
          }
        })
        .then(function (data) {
          Encrypt.token.set(data.head.token);
          return data;
        })
        .then(function (data) {
          vm.$router.push('/layout/cases');
        });
    },
    onEnter() {
      this.onLogin();
    }
  }
};
