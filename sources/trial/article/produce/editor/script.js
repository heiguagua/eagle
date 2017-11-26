import trial from "./script.vue.data.trial";
import options from "./script.vue.data.options";
import methods from "./script.vue.methods";
import TrialHeader from "../0-header";
import TrialInfomation from "../1-infomation";

import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {}
  },
  components: {
    TrialHeader,
    TrialInfomation,
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
    isChiefOfficer() {
      return (this.trial.infomation.officer[0].duty === "审判长") ? true : false;
    },
  },
  methods,
  created() {
    // TODO 对Trial进行对象的深度比较，然后判断是使用全新的Trial，还是使用当前对象树上挂载的
    // if (this.trial!=="{}") {
    //   this.setTrial(this.$store.state.Trial.trial); // 从store获取trial
    // } else {
    //   this.setTrial(trial()); // 使用全新的trial
    // }
    this.setOptions(options);
    this.setTrial(trial());
  },
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
