import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import Util from "../3-verification/util.js";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {
    ...mapMutations("Trial", [
      "setAdjourn", // 休庭操作
    ]),
    //控制是否全部愿意调解显示框
    toMediate: function() {
      const vm = this;
      let array = [];
      for (let i in this.trial.verification.participator) {
        this.trial.verification.participator[i].forEach(function(item) {
          for (let j in item) {
            if (Util.isType(item[j]) === 'Array') {
              item[j].forEach(function(v) {
                if (v.conciliation.status == "不同意") {
                  array.push({
                    type: v.type,
                    name: v.name
                  });
                }
              });
            }
          }
        });
      }
      this.trial.conciliation.toMediateMan = array;
      this.trial.conciliation.toMediateMan.length ? (this.trial.conciliation.status = false) : (this.trial.conciliation.status = true);
    },
  },
};
