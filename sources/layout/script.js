import Http from "../common/scripts/http";
import { message } from "../common/scripts/helper";
import Encrypt from "../common/scripts/encrypt";

export default {
  data() {
    return {
      keyword: "",
      socket: {},
    }
  },
  methods: {
    search() {
      console.log("search!");
    },
    logout(command) {
      const vm = this;
      if (command)
        switch (command) {
          case "update":
            // 修改密码
            break;
          case "feedback":
            // 提交反馈
            break;
          case "logout":
            Http.fetch({
                method: "POST",
                url: Http.url.master + "/logout",
              }).then(result => {
                const data = result.data;
                if (Http.protocol(data, 200)) {
                  Encrypt.token.remove();
                  vm.$router.replace("/login");
                  message(vm, "info", data.head.message);
                } else {
                  message(vm, "warning", data.head.message);
                }
              })
              .catch(function(error) {
                console.info(error);
              })
            break;
        }
    },
    openSocket() {
      const token = Encrypt.token.get();
      const URI = Http.url.socket + "?token=" + token;
      const socket = this.socket = new WebSocket(URI);
      socket.onopen = event => {
        setInterval(() => {
          socket.send(token);
        }, 20000);
        console.info("Socket is open!");
      };
      socket.onmessage = event => {
        if (event && event.data && event.data.head && event.data.head.message) {
          console.info(event.data.head.message);
        }
      };
      socket.onerror = event => {
        console.error(event);
      };
    },
    closeSocket() {
      const socket = this.socket;
      socket.onclose = event => {
        socket.close();
      };
      console.info("Socket is closed!");
    }
  },
  mounted() {
    this.openSocket();
  },
  destroyed() {
    this.closeSocket();
  }
};
