import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, notify } from "../../../../common/scripts/helper";
import Trial from "../script.vue.data.trial";
import TrialAccuser from "./1-accuser";
import TrialAccused from "./2-accused";
import TrialThirdparty from "./3-thirdparty";

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
  methods: {},
};
