import Trial from "./script.vue.data.trial";
import { message, notify } from "../../../../common/scripts/helper";
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

export default {
  ...mapMutations("Trial", [
    "setTrial",
    "setOptions"
  ]),

};
