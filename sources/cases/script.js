import Http from '../common/scripts/http.js';
import Encrypt from '../common/scripts/encrypt.js';
export default {
  data() {
    return {}
  },
  methods: {
    get() {
      const vm = this;
      Http.fetch({
          method: 'GET',
          url: Http.url.master + '/legal_case/list',
          data: {
            loginName: vm.loginName,
            password: Encrypt.md5(vm.password)
          }
        })
        .then(function (result) {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            return data
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
    }
  },
  mounted: {

  }
};
