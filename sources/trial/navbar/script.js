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
  created() {
    const vm = this;
    vm.operation = vm.$route.query.operation;
    // 区分新建、修改的状态，从而挂载不同的store
    if (vm.operation === "create") {
      this.setOptions(options);
      this.setTrial(trial());
    } 
   
  },
  methods: {
    ...mapMutations("Trial", [
      "setTrial",
      "setOptions"
    ]),
    collapse() {
      this.menu.isCollapse = !this.menu.isCollapse;
    }
  }
}
