import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
// Store
import trial from "../article/produce/script.vue.data.trial.js";
import options from "../article/produce/script.vue.data.options.js";
export default {
  data() {
    return {
      menu: {
        isCollapse: false
      },
    }
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  mounted() {
    const vm = this;
    // 区分新建、修改的状态，从而挂载不同的store
    vm.nav();
   
  },
  methods: {
    collapse() {
      this.menu.isCollapse = !this.menu.isCollapse;
    },
    nav() { //blank页面下，导航隐藏
      const vm = this;
      if (vm.$route.path === "/layout/trial/blank") {
        this.trial.navStatus = false;
      } else {
        this.trial.navStatus = true;
      }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route": "nav"
  }
}
