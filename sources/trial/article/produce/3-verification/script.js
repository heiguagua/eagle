import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, notify } from "../../../../common/scripts/helper";
import Trial from "../script.vue.data.trial";
import TrialAccuser from "./accuser";
import TrialAccused from "./accused";
import TrialThirdparty from "./thirdparty";

export default {
  data() {
    return {}
  },
  components: {
    TrialAccuser,
    TrialAccused,
    TrialThirdparty,
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {

  },
};
