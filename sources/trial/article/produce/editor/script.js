import trial from "./script.vue.data.trial";
import options from "./script.vue.data.options";
import computed from "./script.vue.computed";
import methods from "./script.vue.methods";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      trial: trial(),
      options,
    }
  },
  computed,
  methods,
  mounted() {},
  directives: {
    hoverToggle: {
      // 指令的定义
      bind: function(el, binding, vnode, oldVnode) {
        var target = el.querySelectorAll(".hover-toggle");
        // target.addEventListener("mouseover", function(event) {
        //   alert();
        // })
      }
    }
  }
};
