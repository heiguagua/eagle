import Http from "../common/scripts/http.js";
import Encrypt from "../common/scripts/encrypt.js";
export default {
  data() {
    return {
      search: ""
    }
  },
  methods: {
    onSearch() {
      console.log("on Search!");
    },
    logout() {
      console.log("test");
    }
  }
};
