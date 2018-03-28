import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { message, notify } from "../../../../common/scripts/helper";
import Trial from "../script.vue.data.trial";
import TrialAccuser from "./1-accuser";
import TrialAccused from "./2-accused";
import TrialObjection from "./4-objection";
import TrialAbsence from "./5-absence";
import TrialWitness from "./6-witness";


export default {
  data() {
    return {}
  },
  components: {
    TrialAccuser,
    TrialAccused,
    TrialObjection,
    TrialAbsence,
    TrialWitness,
  },
  computed: {
    ...mapState("Trial", [
      "trial",
      "options"
    ]),
  },
  methods: {},
};
