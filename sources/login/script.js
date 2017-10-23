import Http from '../common/scripts/http.js';
import Encrypt from '../common/scripts/encrypt.js';
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
            return data
          } else {
            vm.$message({
              type: 'warning',
              message: data.head.message
            });
          }
        })
        .then(function (data) {
          vm.$message({
            message: data.head.message
          });
          return data;
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
