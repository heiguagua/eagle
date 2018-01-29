import Http from "../common/scripts/http";
import { message } from "../common/scripts/helper";
import Encrypt from "../common/scripts/encrypt";

export default {
  data() {
    return {
      keyword: "",
      heartbeat: 0,
    }
  },
  computed: {
    isProduction() {
      return process.env.NODE_ENV !== "production";
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
                  vm.closeHeartbeat();
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
    openHeartbeat() {
      if (this.isProduction) {
        this.heartbeat = window.setInterval(() => {
          Http.fetch({
              method: "GET",
              url: Http.url.master + "/heartbeat",
            })
            .catch(function(error) {
              console.error(error);
            })
        }, 3000)
      }
    },
    closeHeartbeat() {
      if (this.isProduction) {
        window.clearInterval(this.heartbeat);
      }
    },
  },
  mounted() {
    this.openHeartbeat();
  },
  destroyed() {
    this.closeHeartbeat();
  }
};
