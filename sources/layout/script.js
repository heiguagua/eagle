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
            vm.$router.replace('/login');
            break;
        }
    }
  },
  mounted() {
    // Heartbeat
    const token = Encrypt.token.get();
    const URI = Http.url.socket + '?Authorization=' + token;
    const Socket = new WebSocket(URI);
    Socket.onopen = event => {
      setInterval(() => {
        Socket.send(token);
      }, 20000);
    };
    Socket.onclose = event => {
      Socket.send('CLOSE');
    };
    Socket.onmessage = event => {
      if (event && event.data && event.data.head && event.data.head.message) {
        console.info(event.data.head.message);
      }
    };
    Socket.onerror = event => {
      Socket.send('ERROR');
    };
  }
};
