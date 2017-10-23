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
    logout(command) {
      const vm = this;
      if (command)
        switch (command) {
          case 'update':
            // 修改密码
            break;
          case 'feedback':
            // 提交反馈
            break;
          case 'quit':
            Encrypt.token.remove(); // Remove token
            vm.$router.push('/login');
            break;
        }
    }
  }
};
