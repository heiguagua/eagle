import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, notify, storage } from "../../../../../common/scripts/helper";
import Trial from "../../script.vue.data.trial";
import Util from "../util.js";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options",
      "template"
    ]),
  },
  methods: {
    ...mapMutations("Trial", [
      "setAdjourn", // 休庭操作
    ]),
    //控制是否有证人出庭
    witness: function() {
      const vm = this;
      let array = [];
      for (let i in this.trial.verification.participator) {
        this.trial.verification.participator[i].forEach(function(item) {
          for (let j in item) {
            if (Util.isType(item[j]) === 'Array') {
              item[j].forEach(function(v) {
                if (v.witness.detail == "有") {
                  array.push({
                    i: " ",
                  });
                }
              });
            }
          }
        });
      }
      this.trial.verification.witness.detail = array;
      this.trial.verification.witness.detail.length ? (this.trial.verification.witness.status = true) : (this.trial.verification.witness.status = false);
    },
  }
};
